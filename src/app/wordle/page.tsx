"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import StudioNavbar from "@/components/StudioNavbar";
import StudioFooter from "@/components/StudioFooter";
import {
  HelpCircle,
  BarChart2,
  RotateCcw,
  ArrowLeft,
  Share2,
  Check,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Search,
  ExternalLink,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  isValidWord,
  getRandomTargetWord,
  getRecentWords,
  recordRecentWord,
} from "@/lib/wordle-words";

type TileState = "empty" | "tbd" | "correct" | "present" | "absent";

interface Stats {
  played: number;
  won: number;
  streak: number;
  maxStreak: number;
}

export interface RoundAudit {
  roundNumber: number;
  targetWord: string;
  guesses: string[];
  isWon: boolean;
  attemptsUsed: number;
}

const TOTAL_ROUNDS = 5;

// Pure tile evaluation for any guess against a target word
function getTileStateForWord(guess: string, index: number, target: string): TileState {
  const letter = guess[index];
  if (letter === target[index]) return "correct";
  if (target.includes(letter)) return "present";
  return "absent";
}

// Evaluate letter matches for audio trigger feedback
function evaluateGuess(guess: string, target: string) {
  const targetChars = target.split("");
  const guessChars = guess.split("");
  const remainingTarget: (string | null)[] = [...targetChars];

  let correctCount = 0;
  let presentCount = 0;

  // Pass 1: exact matches (greens)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === targetChars[i]) {
      correctCount++;
      remainingTarget[i] = null;
    }
  }

  // Pass 2: misplaced matches (yellows)
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] !== targetChars[i]) {
      const matchIndex = remainingTarget.indexOf(guessChars[i]);
      if (matchIndex !== -1) {
        presentCount++;
        remainingTarget[matchIndex] = null;
      }
    }
  }

  const totalMatched = correctCount + presentCount;
  const allMissing = totalMatched === 0;
  // Close: almost 5 letters found (all 5 matched) OR 4 exact letters correct
  const isClose = !allMissing && (correctCount >= 4 || totalMatched >= 4);

  return {
    correctCount,
    presentCount,
    totalMatched,
    allMissing,
    isClose,
  };
}

export default function WordlePage() {
  // 5-Round Series State
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundHistory, setRoundHistory] = useState<RoundAudit[]>([]);
  const [lastRoundResult, setLastRoundResult] = useState<RoundAudit | null>(null);
  const [showRoundModal, setShowRoundModal] = useState<boolean>(false);
  const [showSeriesSummary, setShowSeriesSummary] = useState<boolean>(false);

  // Active Board State
  const [targetWord, setTargetWord] = useState<string>("EARTH");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  // Telemetry & Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [shakingRow, setShakingRow] = useState<number | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [copiedSeriesShare, setCopiedSeriesShare] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({ played: 0, won: 0, streak: 0, maxStreak: 0 });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const gameWrapperRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Fullscreen event listener
  useEffect(() => {
    const handleFsChange = () => {
      const isFs =
        Boolean(document.fullscreenElement) ||
        Boolean((document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement);
      setIsFullscreen(isFs);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const el = gameWrapperRef.current || document.documentElement;
      const isCurrentlyFs =
        Boolean(document.fullscreenElement) ||
        Boolean((document as unknown as { webkitFullscreenElement?: Element }).webkitFullscreenElement);

      if (!isCurrentlyFs) {
        if (el?.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as unknown as { webkitRequestFullscreen?: () => Promise<void> })?.webkitRequestFullscreen) {
          await (el as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
          await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      // Fallback toggle for environments restricting native fullscreen API
      setIsFullscreen((prev) => !prev);
    }
  };

  // Initialize audio elements & load preferences on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = {
        boom: new Audio("/boom.mp3"),
        close: new Audio("/close.mp3"),
        correct: new Audio("/correct.mp3"),
      };
      Object.values(audioRef.current).forEach((audio) => {
        audio.preload = "auto";
      });

      try {
        const savedMute = localStorage.getItem("wordle_muted");
        if (savedMute !== null) {
          setIsMuted(JSON.parse(savedMute));
        }
      } catch {}

      try {
        const savedStats =
          localStorage.getItem("wordle_stats") || localStorage.getItem("xwordle_stats");
        if (savedStats) {
          setStats(JSON.parse(savedStats));
        }
      } catch {}
    }
  }, []);

  // Initialize first target word on mount
  useEffect(() => {
    const recents = getRecentWords();
    const initialWord = getRandomTargetWord(recents);
    setTargetWord(initialWord);
    recordRecentWord(initialWord);
  }, []);

  const playSound = useCallback(
    (sound: "boom" | "close" | "correct") => {
      if (isMuted || typeof window === "undefined") return;
      try {
        const audio = audioRef.current[sound] || new Audio(`/${sound}.mp3`);
        audio.currentTime = 0;
        audio.volume = 0.8;
        const promise = audio.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      } catch {}
    },
    [isMuted]
  );

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("wordle_muted", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const triggerShake = (rowIndex: number) => {
    setShakingRow(rowIndex);
    setTimeout(() => {
      setShakingRow(null);
    }, 450);
  };

  // Complete the current round and record results
  const finishRound = useCallback(
    (won: boolean, finalGuesses: string[]) => {
      const result: RoundAudit = {
        roundNumber: currentRound,
        targetWord,
        guesses: finalGuesses,
        isWon: won,
        attemptsUsed: won ? finalGuesses.length : 6,
      };

      setRoundHistory((prev) => [...prev, result]);
      setLastRoundResult(result);
      setGameStatus(won ? "won" : "lost");

      // Update lifetime stats
      setStats((prev) => {
        const updated = {
          played: prev.played + 1,
          won: won ? prev.won + 1 : prev.won,
          streak: won ? prev.streak + 1 : 0,
          maxStreak: won ? Math.max(prev.maxStreak, prev.streak + 1) : prev.maxStreak,
        };
        try {
          localStorage.setItem("wordle_stats", JSON.stringify(updated));
        } catch {}
        return updated;
      });

      // Show series summary if last round, else show round verdict
      if (currentRound >= TOTAL_ROUNDS) {
        setTimeout(() => setShowSeriesSummary(true), 900);
      } else {
        setTimeout(() => setShowRoundModal(true), 900);
      }
    },
    [currentRound, targetWord]
  );

  // Transition to next round (e.g. Round 2 of 5)
  const proceedToNextRound = () => {
    setShowRoundModal(false);
    const nextRoundIndex = currentRound + 1;
    setCurrentRound(nextRoundIndex);

    const recents = getRecentWords();
    const nextWord = getRandomTargetWord(recents);
    setTargetWord(nextWord);
    recordRecentWord(nextWord);

    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    triggerToast(`Round 0${nextRoundIndex} Ready`);
  };

  // Start a fresh 5-round series
  const startNewSeries = () => {
    try {
      Object.values(audioRef.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    } catch {}

    setShowRoundModal(false);
    setShowSeriesSummary(false);
    setShowStats(false);
    setCurrentRound(1);
    setRoundHistory([]);
    setLastRoundResult(null);

    const recents = getRecentWords();
    const firstWord = getRandomTargetWord(recents);
    setTargetWord(firstWord);
    recordRecentWord(firstWord);

    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    triggerToast("New 5-Round Series Started");
  };

  // Keyboard input handler
  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;
      if (showRoundModal || showSeriesSummary || showHelp || showStats) return;

      const upper = key.toUpperCase();

      if (upper === "BACKSPACE" || upper === "⌫") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (upper === "ENTER") {
        if (currentGuess.length !== 5) {
          triggerToast("Needs 5 letters");
          triggerShake(guesses.length);
          return;
        }

        // Fast O(1) dictionary verification check
        if (!isValidWord(currentGuess)) {
          triggerToast("Not in word list");
          triggerShake(guesses.length);
          return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === targetWord) {
          playSound("correct");
          finishRound(true, newGuesses);
        } else {
          // Audio feedback triggers on guess precision
          const evalResult = evaluateGuess(currentGuess, targetWord);
          if (evalResult.allMissing) {
            playSound("boom");
          } else if (evalResult.isClose) {
            playSound("close");
          }

          if (newGuesses.length >= 6) {
            finishRound(false, newGuesses);
          }
        }
        return;
      }

      if (/^[A-Z]$/.test(upper) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + upper);
      }
    },
    [
      currentGuess,
      guesses,
      gameStatus,
      targetWord,
      playSound,
      finishRound,
      showRoundModal,
      showSeriesSummary,
      showHelp,
      showStats,
    ]
  );

  // Global physical keyboard listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace" || e.key === "Enter" || /^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  // Evaluate letter tile states for active round
  const getTileState = (guess: string, index: number): TileState => {
    return getTileStateForWord(guess, index, targetWord);
  };

  // Key color states for on-screen keyboard
  const getKeyStatuses = () => {
    const statusMap: Record<string, TileState> = {};
    guesses.forEach((guess) => {
      guess.split("").forEach((letter, i) => {
        if (targetWord[i] === letter) {
          statusMap[letter] = "correct";
        } else if (targetWord.includes(letter) && statusMap[letter] !== "correct") {
          statusMap[letter] = "present";
        } else if (!targetWord.includes(letter) && !statusMap[letter]) {
          statusMap[letter] = "absent";
        }
      });
    });
    return statusMap;
  };

  const keyStatuses = getKeyStatuses();

  // Share single round generator
  const shareSingleRound = () => {
    const rows = guesses.map((guess) => {
      return guess
        .split("")
        .map((_, i) => {
          const s = getTileState(guess, i);
          if (s === "correct") return "🟩";
          if (s === "present") return "🟪";
          return "⬛";
        })
        .join("");
    });

    const shareText = `Wordle Round 0${currentRound}/05 ${
      gameStatus === "won" ? `${guesses.length}/6` : "X/6"
    }\n\n${rows.join("\n")}\n\nhttps://xweet.in/wordle`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Share full 5-round series generator
  const shareSeriesResult = () => {
    const solvedCount = roundHistory.filter((r) => r.isWon).length;
    const header = `Wordle 5-Round Series: ${solvedCount}/05 Solved\n`;
    const roundsText = roundHistory
      .map((r) => {
        const verdict = r.isWon ? `${r.attemptsUsed}/6` : "X/6";
        const grid = r.guesses
          .map((guess) =>
            guess
              .split("")
              .map((_, i) => {
                const s = getTileStateForWord(guess, i, r.targetWord);
                if (s === "correct") return "🟩";
                if (s === "present") return "🟪";
                return "⬛";
              })
              .join("")
          )
          .join("\n");
        return `Round 0${r.roundNumber} (${verdict}):\n${grid}`;
      })
      .join("\n\n");

    const fullShare = `${header}\n${roundsText}\n\nhttps://xweet.in/wordle`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullShare);
      setCopiedSeriesShare(true);
      setTimeout(() => setCopiedSeriesShare(false), 2000);
    }
  };

  // Rating descriptor for series score
  const getRating = (solved: number) => {
    if (solved === 5) return { title: "Grandmaster Lexicographer", badge: "Flawless Deductions" };
    if (solved === 4) return { title: "Master Cryptic Solver", badge: "80% Precision" };
    if (solved === 3) return { title: "Seasoned Wordsmith", badge: "60% Accuracy" };
    if (solved >= 1) return { title: "Apprentice Explorer", badge: "Keep Honing" };
    return { title: "Field Observer", badge: "Try Another Series" };
  };

  const seriesSolvedCount = roundHistory.filter((r) => r.isWon).length;
  const ratingInfo = getRating(seriesSolvedCount);

  // On-screen keyboard rows
  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Studio Navigation Bar (Hidden in Fullscreen) */}
      {!isFullscreen && <StudioNavbar />}

      {/* ========================================================================= */}
      {/* GAME WRAPPER ARENA: ZOOMED & FITTED (Zero-Scroll in Fullscreen Mode) */}
      {/* ========================================================================= */}
      <div
        ref={gameWrapperRef}
        className={`bg-paper text-carbon flex flex-col justify-between ${
          isFullscreen
            ? "fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden p-2 sm:p-4 select-none"
            : "flex-1 w-full min-h-[calc(100dvh-68px)] max-h-[100dvh] overflow-hidden"
        }`}
      >
        {/* ========================================================================= */}
        {/* DEDICATED 5-ROUND SERIES CONTROL BAR */}
        {/* ========================================================================= */}
        <div className="w-full border-b border-terrain/20 bg-paper/60 backdrop-blur-xs shrink-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
            {/* Left: Back Link & Series Round Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/games"
                className="flex items-center gap-1.5 text-xs font-mono text-terrain hover:text-carbon transition-colors"
                title="Return to Games Hub"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Games</span>
              </Link>

              <span className="text-terrain/30 hidden sm:inline">•</span>

              <div className="flex items-center gap-2">
                <span className="font-playwrite text-2xl tracking-tight text-carbon">wordle</span>
                <span className="text-[11px] font-mono uppercase bg-carbon text-paper px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap shrink-0">
                  Round 0{currentRound} / 0{TOTAL_ROUNDS}
                </span>
              </div>
            </div>

            {/* Center: Progress Segments & Score (Desktop) */}
            <div className="hidden md:flex flex-col items-center gap-1 shrink-0">
              <span className="text-[11px] font-mono text-terrain">
                Series Score: <strong className="text-carbon font-semibold">{seriesSolvedCount}</strong> of {TOTAL_ROUNDS} Solved
              </span>

              {/* 5 Progress Segments */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
                  const isPast = i < roundHistory.length;
                  const isCurrent = i === currentRound - 1;
                  const pastRound = roundHistory[i];
                  const isCorrect = pastRound?.isWon === true;

                  let pillClass = "h-1.5 rounded-full transition-all duration-300 ";
                  if (isPast) {
                    pillClass += isCorrect ? "w-6 bg-signal-lime" : "w-6 bg-carbon/35";
                  } else if (isCurrent) {
                    pillClass += "w-8 bg-carbon";
                  } else {
                    pillClass += "w-4 bg-terrain/25";
                  }

                  return <div key={i} className={pillClass} />;
                })}
              </div>
            </div>

            {/* Right Toolbar Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer"
                title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
                aria-label={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-terrain/60" />
                ) : (
                  <Volume2 className="w-4 h-4 text-carbon" />
                )}
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-carbon" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-terrain" />
                )}
              </button>

              {/* How to Play */}
              <button
                onClick={() => setShowHelp(true)}
                className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer"
                title="How to Play"
                aria-label="How to Play"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {/* Lifetime Stats */}
              <button
                onClick={() => setShowStats(true)}
                className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer"
                title="Statistics & Records"
                aria-label="Statistics & Records"
              >
                <BarChart2 className="w-4 h-4" />
              </button>

              {/* Reset 5-Round Series */}
              <button
                onClick={startNewSeries}
                className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer"
                title="Restart 5-Round Series"
                aria-label="Restart 5-Round Series"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Series Progress Bar */}
          <div className="flex md:hidden items-center justify-between max-w-sm mx-auto px-4 pb-2 text-[11px] font-mono text-terrain">
            <span>Round 0{currentRound} / 0{TOTAL_ROUNDS}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
                const isPast = i < roundHistory.length;
                const isCurrent = i === currentRound - 1;
                const pastRound = roundHistory[i];
                const isCorrect = pastRound?.isWon === true;

                let pillClass = "h-1.5 rounded-full transition-all ";
                if (isPast) {
                  pillClass += isCorrect ? "w-4 bg-signal-lime" : "w-4 bg-carbon/30";
                } else if (isCurrent) {
                  pillClass += "w-6 bg-carbon";
                } else {
                  pillClass += "w-3 bg-terrain/25";
                }
                return <div key={i} className={pillClass} />;
              })}
            </div>
            <span>{seriesSolvedCount} Solved</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GAMEPLAY CANVAS: ZOOMED & FITTED VERTICALLY */}
        {/* ========================================================================= */}
        <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex flex-col items-center justify-between min-h-0 overflow-hidden">
          {/* Floating Toast Notification */}
          {toastMessage && (
            <div className="fixed top-16 z-50 bg-carbon text-paper px-4 py-2 rounded-full text-xs font-mono shadow-md animate-in fade-in slide-in-from-top-2">
              {toastMessage}
            </div>
          )}

          {/* 6x5 LETTER GRID (ZOOMED & FITTED) */}
          <div className="my-auto py-1 sm:py-2 flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 justify-center">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const isCurrentRow = rowIndex === guesses.length;
              const rowGuess = guesses[rowIndex] || (isCurrentRow ? currentGuess : "");
              const isShaking = shakingRow === rowIndex;

              return (
                <div
                  key={rowIndex}
                  className={`flex gap-1.5 sm:gap-2.5 justify-center transition-transform ${
                    isShaking ? "animate-shake" : ""
                  }`}
                >
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    const letter = rowGuess[colIndex] || "";
                    const isSubmitted = rowIndex < guesses.length;
                    const state: TileState = isSubmitted
                      ? getTileState(guesses[rowIndex], colIndex)
                      : letter
                        ? "tbd"
                        : "empty";

                    let styleClass =
                      "aspect-square w-12 h-12 sm:w-15 sm:h-15 md:w-17 md:h-17 lg:w-19 lg:h-19 max-h-[10.5vh] max-w-[10.5vh] sm:max-h-[11.5vh] sm:max-w-[11.5vh] border rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-mono uppercase transition-all duration-200 select-none shadow-2xs ";

                    if (state === "correct") {
                      styleClass += "bg-signal-lime text-carbon border-signal-lime font-bold shadow-xs";
                    } else if (state === "present") {
                      styleClass += "bg-mist/85 text-carbon border-mist font-bold";
                    } else if (state === "absent") {
                      styleClass += "bg-terrain/20 text-terrain/70 border-terrain/30 font-medium";
                    } else if (state === "tbd") {
                      styleClass += "border-2 border-carbon bg-white text-carbon font-bold scale-102";
                    } else {
                      styleClass += "border-terrain/30 bg-white/40 text-carbon";
                    }

                    return (
                      <div key={colIndex} className={styleClass}>
                        {letter}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* TOUCH-FRIENDLY VIRTUAL KEYBOARD */}
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl pb-1 sm:pb-3 select-none touch-manipulation shrink-0">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5 my-1">
                {row.map((k) => {
                  const status = keyStatuses[k];
                  const isWide = k === "ENTER" || k === "⌫";

                  let keyClass =
                    "h-10 sm:h-12 md:h-13 rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm md:text-base font-semibold flex items-center justify-center transition-all cursor-pointer active:scale-95 border ";

                  if (isWide) {
                    keyClass += "px-2 sm:px-3.5 bg-paper border-terrain/40 text-carbon min-w-[42px] sm:min-w-[58px] md:min-w-[68px]";
                  } else if (status === "correct") {
                    keyClass += "bg-signal-lime border-signal-lime text-carbon shadow-2xs min-w-[28px] sm:min-w-[34px] md:min-w-[40px] flex-1";
                  } else if (status === "present") {
                    keyClass += "bg-mist/85 border-mist text-carbon min-w-[28px] sm:min-w-[34px] md:min-w-[40px] flex-1";
                  } else if (status === "absent") {
                    keyClass += "bg-terrain/25 border-terrain/35 text-terrain/60 min-w-[28px] sm:min-w-[34px] md:min-w-[40px] flex-1";
                  } else {
                    keyClass += "bg-white/80 border-terrain/30 text-carbon hover:bg-white min-w-[28px] sm:min-w-[34px] md:min-w-[40px] flex-1 shadow-2xs";
                  }

                  return (
                    <button
                      key={k}
                      onClick={() => handleKey(k)}
                      className={keyClass}
                      aria-label={k}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Studio Architectural Footer (Hidden in Fullscreen) */}
      {!isFullscreen && <StudioFooter />}

      {/* ========================================================================= */}
      {/* ROUND OUTCOME MODAL (BETWEEN ROUNDS 1-4) */}
      {/* ========================================================================= */}
      {showRoundModal && lastRoundResult && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-terrain">
                  ROUND 0{lastRoundResult.roundNumber} OF 0{TOTAL_ROUNDS}
                </span>
                <h3 className="text-xl sm:text-2xl font-space font-medium text-carbon">
                  {lastRoundResult.isWon ? "Splendid Deduction!" : "Round Missed"}
                </h3>
              </div>
              <span
                className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full ${
                  lastRoundResult.isWon
                    ? "bg-signal-lime text-carbon"
                    : "bg-carbon text-paper"
                }`}
              >
                {lastRoundResult.isWon
                  ? `${lastRoundResult.attemptsUsed}/6 Solved`
                  : "0/1 Pts"}
              </span>
            </div>

            {/* Revealed Target Word & Google Search Button */}
            {!lastRoundResult.isWon ? (
              <div className="p-5 rounded-2xl bg-black/5 border border-terrain/25 text-center space-y-3">
                <span className="text-[11px] font-mono text-terrain uppercase tracking-wider block">
                  The secret word was
                </span>
                <span className="text-3xl font-mono font-bold text-carbon tracking-widest block">
                  {lastRoundResult.targetWord}
                </span>

                {/* Direct Google Definition Lookup Button */}
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    `define ${lastRoundResult.targetWord}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold bg-signal-lime hover:bg-[#cbf056] text-carbon border border-signal-lime/80 transition-all shadow-xs group cursor-pointer"
                  title={`Search meaning of ${lastRoundResult.targetWord} on Google`}
                >
                  <Search className="w-3.5 h-3.5 text-carbon" />
                  <span>Learn Word Meaning on Google ↗</span>
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/50 border border-terrain/25 text-center space-y-2">
                <span className="text-xs font-mono text-terrain">
                  Word target: <strong className="text-carbon font-bold">{lastRoundResult.targetWord}</strong>
                </span>
                <div className="pt-1">
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      `define ${lastRoundResult.targetWord}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-terrain hover:text-carbon underline underline-offset-4"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search definition on Google ↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Series Standing Telemetry */}
            <div className="p-3.5 rounded-2xl bg-white/40 border border-terrain/20 flex items-center justify-between text-xs font-mono">
              <span className="text-terrain">5-Round Series Standing:</span>
              <span className="font-bold text-carbon">
                {seriesSolvedCount} / {currentRound} Rounds Won
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={proceedToNextRound}
                className="w-full py-3.5 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Round 0{currentRound + 1} / 0{TOTAL_ROUNDS}</span>
                <ArrowRight className="w-3.5 h-3.5 text-signal-lime" />
              </button>

              <button
                onClick={shareSingleRound}
                className="w-full py-2.5 rounded-full border border-terrain/35 hover:border-carbon text-carbon font-mono text-xs font-medium transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-carbon" />
                    <span>Copied Round Grid!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-terrain" />
                    <span>Share This Round</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FINAL 5-ROUND SERIES SCORING SCREEN */}
      {/* ========================================================================= */}
      {showSeriesSummary && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 my-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-terrain/25 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-signal-lime bg-carbon px-2.5 py-0.5 rounded-full inline-block">
                  Series Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
                  5-Round Series Audit
                </h2>
                <p className="text-xs text-terrain font-light">
                  Complete debrief across your 5 deductive word challenges.
                </p>
              </div>

              <div className="self-start sm:self-center">
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-signal-lime text-carbon border border-signal-lime/80">
                  {ratingInfo.title}
                </span>
              </div>
            </div>

            {/* Score Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
              <div className="p-3.5 rounded-2xl bg-white/60 border border-terrain/25">
                <span className="text-2xl sm:text-3xl font-bold text-carbon block">
                  {seriesSolvedCount} / {TOTAL_ROUNDS}
                </span>
                <span className="text-[10px] text-terrain uppercase">Solved</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 border border-terrain/25">
                <span className="text-2xl sm:text-3xl font-bold text-carbon block">
                  {Math.round((seriesSolvedCount / TOTAL_ROUNDS) * 100)}%
                </span>
                <span className="text-[10px] text-terrain uppercase">Accuracy</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 border border-terrain/25">
                <span className="text-2xl sm:text-3xl font-bold text-carbon block">
                  {roundHistory.reduce((acc, r) => acc + r.attemptsUsed, 0)}
                </span>
                <span className="text-[10px] text-terrain uppercase">Total Tries</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 border border-terrain/25">
                <span className="text-2xl sm:text-3xl font-bold text-carbon block">
                  {seriesSolvedCount > 0
                    ? (
                        roundHistory
                          .filter((r) => r.isWon)
                          .reduce((acc, r) => acc + r.attemptsUsed, 0) / seriesSolvedCount
                      ).toFixed(1)
                    : "—"}
                </span>
                <span className="text-[10px] text-terrain uppercase">Avg Guesses</span>
              </div>
            </div>

            {/* 5-Round Word Audit List */}
            <div className="space-y-2.5 max-h-64 sm:max-h-72 overflow-y-auto pr-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-terrain block">
                Round-by-Round Breakdown & Word Definitions:
              </span>

              {roundHistory.map((r) => (
                <div
                  key={r.roundNumber}
                  className="p-3.5 rounded-2xl bg-white/50 border border-terrain/25 flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-terrain font-medium">0{r.roundNumber}</span>
                    <div>
                      <span className="text-base font-bold text-carbon tracking-wider block">
                        {r.targetWord}
                      </span>
                      <span className="text-[10px] text-terrain">
                        {r.isWon ? `Solved in ${r.attemptsUsed}/6 attempts` : "Failed in 6 attempts"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.isWon
                          ? "bg-signal-lime/30 text-carbon border border-signal-lime/60"
                          : "bg-carbon/10 text-terrain border border-terrain/30"
                      }`}
                    >
                      {r.isWon ? "SOLVED" : "MISSED"}
                    </span>

                    {/* Direct Google definition link for every word */}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        `define ${r.targetWord}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-terrain/35 hover:border-carbon text-terrain hover:text-carbon transition-colors bg-white/80"
                      title={`Search definition of ${r.targetWord} on Google`}
                    >
                      <Search className="w-3 h-3 text-terrain" />
                      <span>Meaning ↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Series Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={startNewSeries}
                className="w-full py-3.5 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 border border-signal-lime/80 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-carbon" />
                <span>Start New 5-Round Series</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={shareSeriesResult}
                  className="flex-1 py-2.5 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedSeriesShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-signal-lime" />
                      <span>Copied Series Grid!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-signal-lime" />
                      <span>Share 5-Round Series</span>
                    </>
                  )}
                </button>

                <Link
                  href="/games"
                  className="px-5 py-2.5 rounded-full border border-terrain/35 hover:border-carbon text-carbon font-mono text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Games Hub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HOW TO PLAY MODAL */}
      {/* ========================================================================= */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-playwrite text-2xl text-carbon">wordle</span>
                <span className="text-[10px] font-mono bg-carbon text-paper px-1.5 py-0.5 rounded font-semibold">
                  5-ROUND EXPEDITION
                </span>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1.5 rounded-lg border border-terrain/30 text-carbon hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-carbon/80 font-light leading-relaxed">
              Every expedition consists of a tournament series of <strong>5 rounds</strong>. Deduce each secret <strong>5-letter word</strong> in 6 attempts. Each guess must be a valid English word.
            </p>

            {/* Visual Examples */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-[11px] uppercase tracking-wider text-terrain block">
                Tile Feedback Guide:
              </span>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-signal-lime text-carbon font-bold flex items-center justify-center border border-signal-lime">
                    W
                  </div>
                  <span className="text-carbon/90 text-xs">
                    <strong>Signal Lime</strong>: Letter is in the word and in the correct spot.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-mist/85 text-carbon font-bold flex items-center justify-center border border-mist">
                    O
                  </div>
                  <span className="text-carbon/90 text-xs">
                    <strong>Mist (Purple)</strong>: Letter is in the word, but in the wrong spot.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-terrain/20 text-terrain/70 font-medium flex items-center justify-center border border-terrain/30">
                    R
                  </div>
                  <span className="text-carbon/90 text-xs">
                    <strong>Terrain (Gray)</strong>: Letter is not in the word.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowHelp(false)}
                className="w-full py-3 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all cursor-pointer"
              >
                Got It · Start Series
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIFETIME STATS MODAL */}
      {/* ========================================================================= */}
      {showStats && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-terrain">
                  LIFETIME TELEMETRY
                </span>
                <h3 className="text-xl font-space font-medium text-carbon">Studio Statistics</h3>
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="p-1.5 rounded-lg border border-terrain/30 text-carbon hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Series Standing */}
            <div className="p-3.5 rounded-2xl bg-black/5 border border-terrain/20 flex items-center justify-between text-xs font-mono">
              <span className="text-terrain">Active 5-Game Series:</span>
              <span className="font-bold text-carbon">
                Round 0{currentRound} / 0{TOTAL_ROUNDS} ({seriesSolvedCount} Solved)
              </span>
            </div>

            {/* Telemetry numbers */}
            <div className="grid grid-cols-4 gap-2 text-center font-mono">
              <div className="p-3 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-xl font-bold text-carbon block">{stats.played}</span>
                <span className="text-[10px] text-terrain uppercase">Played</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-xl font-bold text-carbon block">
                  {stats.played ? Math.round((stats.won / stats.played) * 100) : 0}%
                </span>
                <span className="text-[10px] text-terrain uppercase">Win Rate</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-xl font-bold text-carbon block">{stats.streak}</span>
                <span className="text-[10px] text-terrain uppercase">Streak</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/50 border border-terrain/25">
                <span className="text-xl font-bold text-carbon block">{stats.maxStreak}</span>
                <span className="text-[10px] text-terrain uppercase">Max</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                onClick={() => setShowStats(false)}
                className="w-full py-3 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all cursor-pointer"
              >
                Resume Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Studio Architectural Footer */}
      <StudioFooter />
    </div>
  );
}
