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
  SlidersHorizontal,
} from "lucide-react";
import {
  isValidWord,
  getRandomTargetWord,
  getDailyTargetWord,
  getTodayDateKey,
  getRecentWords,
  recordRecentWord,
  getDifficultyPreference,
  setDifficultyPreference,
  type WordleDifficulty,
} from "@/lib/wordle-words";

type TileState = "empty" | "tbd" | "correct" | "present" | "absent";
type WordleMode = "daily" | "free";

interface DailySavedState {
  dateKey: string;
  guesses: string[];
  gameStatus: "playing" | "won" | "lost";
}

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

const DAILY_STORAGE_KEY = "wordle_daily_state";

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
  // Game Mode: "daily" (Word of the Day) or "free" (Endless Random Rounds, exit anytime)
  const [mode, setMode] = useState<WordleMode>("daily");
  const [dailyDateKey, setDailyDateKey] = useState<string>("");

  // Free-Play Session State
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundHistory, setRoundHistory] = useState<RoundAudit[]>([]);
  const [lastRoundResult, setLastRoundResult] = useState<RoundAudit | null>(null);
  const [showRoundModal, setShowRoundModal] = useState<boolean>(false);
  const [showSeriesSummary, setShowSeriesSummary] = useState<boolean>(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<WordleDifficulty>("progressive");
  const [pendingDifficulty, setPendingDifficulty] = useState<WordleDifficulty>("progressive");

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

  const loadDailyWordState = useCallback((dateKey: string) => {
    const dailyWord = getDailyTargetWord(dateKey);
    setTargetWord(dailyWord);
    setDailyDateKey(dateKey);
    setShowRoundModal(false);
    setShowSeriesSummary(false);

    try {
      const raw = localStorage.getItem(DAILY_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DailySavedState;
        if (parsed.dateKey === dateKey && Array.isArray(parsed.guesses)) {
          setGuesses(parsed.guesses);
          setCurrentGuess("");
          const status = parsed.gameStatus || "playing";
          setGameStatus(status);
          if (status !== "playing") {
            setLastRoundResult({
              roundNumber: 1,
              targetWord: dailyWord,
              guesses: parsed.guesses,
              isWon: status === "won",
              attemptsUsed: status === "won" ? parsed.guesses.length : 6,
            });
            setShowRoundModal(true);
          }
          return;
        }
      }
    } catch {}

    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setLastRoundResult(null);
  }, []);

  // Initialize mode & target word on mount
  useEffect(() => {
    const savedDiff = getDifficultyPreference();
    setDifficulty(savedDiff);
    setPendingDifficulty(savedDiff);

    const params = new URLSearchParams(window.location.search);
    const requestedFree = params.get("mode") === "free";

    if (requestedFree) {
      setMode("free");
      const recents = getRecentWords();
      const initialWord = getRandomTargetWord(recents, savedDiff, 1);
      setTargetWord(initialWord);
      recordRecentWord(initialWord);
    } else {
      setMode("daily");
      loadDailyWordState(getTodayDateKey());
    }
  }, [loadDailyWordState]);

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
        roundNumber: mode === "daily" ? 1 : currentRound,
        targetWord,
        guesses: finalGuesses,
        isWon: won,
        attemptsUsed: won ? finalGuesses.length : 6,
      };

      setLastRoundResult(result);
      setGameStatus(won ? "won" : "lost");

      if (mode === "daily") {
        try {
          const payload: DailySavedState = {
            dateKey: dailyDateKey,
            guesses: finalGuesses,
            gameStatus: won ? "won" : "lost",
          };
          localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(payload));
        } catch {}
      } else {
        setRoundHistory((prev) => [...prev, result]);
      }

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

      setTimeout(() => setShowRoundModal(true), 700);
    },
    [mode, currentRound, targetWord, dailyDateKey]
  );

  // Transition to next random round in Free Play
  const proceedToNextRound = () => {
    setShowRoundModal(false);
    const nextRoundIndex = currentRound + 1;
    setCurrentRound(nextRoundIndex);

    const recents = getRecentWords();
    const nextWord = getRandomTargetWord(recents, difficulty, Math.min(nextRoundIndex, 5));
    setTargetWord(nextWord);
    recordRecentWord(nextWord);

    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    triggerToast(`Round ${String(nextRoundIndex).padStart(2, "0")} Ready`);
  };

  // Start a fresh Free Play session
  const startNewSeries = (diffOverride?: WordleDifficulty) => {
    try {
      Object.values(audioRef.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    } catch {}

    const activeDiff =
      (typeof diffOverride === "string" ? diffOverride : null) || difficulty;
    if (typeof diffOverride === "string") {
      setDifficulty(diffOverride);
      setPendingDifficulty(diffOverride);
      setDifficultyPreference(diffOverride);
    }

    setMode("free");
    setShowRoundModal(false);
    setShowSeriesSummary(false);
    setShowStats(false);
    setShowDifficultyModal(false);
    setCurrentRound(1);
    setRoundHistory([]);
    setLastRoundResult(null);

    const recents = getRecentWords();
    const firstWord = getRandomTargetWord(recents, activeDiff, 1);
    setTargetWord(firstWord);
    recordRecentWord(firstWord);

    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    triggerToast(`Free Play Started · ${activeDiff.toUpperCase()}`);
  };

  const switchMode = (nextMode: WordleMode) => {
    if (nextMode === mode) return;
    if (nextMode === "daily") {
      setMode("daily");
      loadDailyWordState(getTodayDateKey());
      triggerToast("Word of the Day");
    } else {
      startNewSeries();
    }
  };

  const finishFreePlaySession = () => {
    setShowRoundModal(false);
    setShowSeriesSummary(true);
  };

  const openDifficultyModal = () => {
    setPendingDifficulty(difficulty);
    setShowDifficultyModal(true);
  };

  const handleApplyDifficultyPreference = (newDiff: WordleDifficulty) => {
    setDifficulty(newDiff);
    setPendingDifficulty(newDiff);
    setDifficultyPreference(newDiff);
    setShowDifficultyModal(false);
    triggerToast(`Difficulty set to ${newDiff.toUpperCase()}`);
  };

  // Keyboard input handler
  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;
      if (showRoundModal || showSeriesSummary || showHelp || showStats || showDifficultyModal) return;

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

    const label =
      mode === "daily"
        ? `Wordle Daily (${dailyDateKey})`
        : `Wordle Round ${String(currentRound).padStart(2, "0")}`;

    const shareText = `${label} ${
      gameStatus === "won" ? `${guesses.length}/6` : "X/6"
    }\n\n${rows.join("\n")}\n\nhttps://xweet.in/wordle`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Share full Free Play session generator
  const shareSeriesResult = () => {
    const totalPlayed = roundHistory.length;
    const solvedCount = roundHistory.filter((r) => r.isWon).length;
    const header = `Wordle Free Play: ${solvedCount}/${totalPlayed} Solved\n`;
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
        return `Round ${String(r.roundNumber).padStart(2, "0")} (${verdict}):\n${grid}`;
      })
      .join("\n\n");

    const fullShare = `${header}\n${roundsText}\n\nhttps://xweet.in/wordle`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullShare);
      setCopiedSeriesShare(true);
      setTimeout(() => setCopiedSeriesShare(false), 2000);
    }
  };

  // Rating descriptor for dynamic session score
  const getRating = (solved: number, total: number) => {
    if (total === 0) return { title: "Quick Break", badge: "No rounds completed" };
    const ratio = solved / total;
    if (ratio === 1) return { title: "Flawless Run", badge: "100% Precision" };
    if (ratio >= 0.75) return { title: "Sharp Solver", badge: `${Math.round(ratio * 100)}% Accuracy` };
    if (ratio >= 0.5) return { title: "Wordsmith", badge: `${Math.round(ratio * 100)}% Accuracy` };
    return { title: "Keep Exploring", badge: `${solved}/${total} Solved` };
  };

  const seriesSolvedCount = roundHistory.filter((r) => r.isWon).length;
  const ratingInfo = getRating(seriesSolvedCount, roundHistory.length);

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
        {/* WORDLE MODE & CONTROL BAR */}
        {/* ========================================================================= */}
        <div className="w-full border-b border-terrain/20 bg-paper/60 backdrop-blur-xs shrink-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
            {/* Left: Back Link & Title */}
            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/games"
                className="flex items-center gap-1.5 text-xs font-mono text-terrain hover:text-carbon transition-colors"
                title="Return to Games Hub"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Games</span>
              </Link>

              <span className="text-terrain/30 hidden sm:inline">•</span>

              <span className="font-playwrite text-xl sm:text-2xl tracking-tight text-carbon">wordle</span>

              {mode === "free" && (
                <span className="hidden md:inline-flex text-[11px] font-mono uppercase bg-carbon text-paper px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                  Round {String(currentRound).padStart(2, "0")} · {seriesSolvedCount} Won
                </span>
              )}
            </div>

            {/* Center: Mode Switcher (Word of the Day vs Free Play) */}
            <div className="flex items-center gap-1 rounded-full border border-terrain/30 bg-white/60 p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => switchMode("daily")}
                className={`cursor-pointer px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  mode === "daily"
                    ? "bg-carbon text-signal-lime font-semibold"
                    : "text-terrain hover:text-carbon"
                }`}
              >
                Daily Word
              </button>
              <button
                type="button"
                onClick={() => switchMode("free")}
                className={`cursor-pointer px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
                  mode === "free"
                    ? "bg-carbon text-signal-lime font-semibold"
                    : "text-terrain hover:text-carbon"
                }`}
              >
                Free Play
              </button>
            </div>

            {/* Right Toolbar Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Finish & Score / Exit in between (Free Play) */}
              {mode === "free" && roundHistory.length > 0 && (
                <button
                  onClick={finishFreePlaySession}
                  className="px-2.5 py-1.5 rounded-xl bg-signal-lime text-carbon font-mono text-[11px] font-semibold hover:bg-[#cbf056] transition-colors cursor-pointer"
                  title="Finish session and view score"
                >
                  Finish ({roundHistory.length})
                </button>
              )}

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

              {/* Difficulty Level Selector (Free Play) */}
              {mode === "free" && (
                <button
                  onClick={openDifficultyModal}
                  className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer flex items-center gap-1.5"
                  title={`Word Difficulty: ${difficulty.toUpperCase()} (Click to change)`}
                  aria-label="Select Word Difficulty Level"
                >
                  <SlidersHorizontal className="w-4 h-4 text-terrain" />
                  <span className="hidden xl:inline text-[11px] font-mono uppercase font-semibold text-carbon">
                    {difficulty}
                  </span>
                </button>
              )}

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

              {/* New Random Word (Free Play) */}
              {mode === "free" && (
                <button
                  onClick={() => startNewSeries()}
                  className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation cursor-pointer"
                  title="Start New Free Play Session"
                  aria-label="Start New Free Play Session"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Mode Status Strip */}
          <div className="flex md:hidden items-center justify-between max-w-sm mx-auto px-4 pb-2 text-[11px] font-mono text-terrain">
            <span>
              {mode === "daily"
                ? `Daily · ${dailyDateKey}`
                : `Free Play · Round ${String(currentRound).padStart(2, "0")}`}
            </span>
            <span>
              {mode === "daily"
                ? gameStatus === "playing"
                  ? "1 shared word today"
                  : gameStatus === "won"
                  ? "Solved today"
                  : "Completed today"
                : `${seriesSolvedCount} / ${roundHistory.length} Solved`}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GAMEPLAY CANVAS: ADAPTIVE SIDE-BY-SIDE ON DESKTOP, STACKED ON MOBILE */}
        {/* ========================================================================= */}
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 min-h-0">
          {/* Floating Toast Notification */}
          {toastMessage && (
            <div className="fixed top-16 z-50 bg-carbon text-paper px-4 py-2 rounded-full text-xs font-mono shadow-md animate-in fade-in slide-in-from-top-2">
              {toastMessage}
            </div>
          )}

          {/* LEFT COLUMN: 6x5 LETTER GRID */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <div className="flex flex-col gap-1.5 sm:gap-2 justify-center">
              {Array.from({ length: 6 }).map((_, rowIndex) => {
                const isCurrentRow = rowIndex === guesses.length;
                const rowGuess = guesses[rowIndex] || (isCurrentRow ? currentGuess : "");
                const isShaking = shakingRow === rowIndex;

                return (
                  <div
                    key={rowIndex}
                    className={`flex gap-1.5 sm:gap-2 justify-center transition-transform ${
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
                        "w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-16 lg:h-16 border rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-mono uppercase transition-all duration-200 select-none shadow-2xs ";

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
          </div>

          {/* RIGHT COLUMN: TELEMETRY & ON-SCREEN KEYBOARD */}
          <div className="flex flex-col items-center justify-center w-full max-w-md sm:max-w-lg shrink-0 gap-2.5 sm:gap-3">
            {/* Minimal Attempt Status Bar (No redundant round repetition) */}
            <div className="w-full flex items-center justify-between px-1 pb-0.5 text-xs font-mono">
              <span className="text-terrain text-[11px] uppercase tracking-wider">
                Attempt <strong className="text-carbon font-bold">{Math.min(guesses.length + 1, 6)}</strong> of 6
              </span>

              {/* 6 Attempt Pips */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => {
                  const isUsed = i < guesses.length;
                  const isCurrent = i === guesses.length;
                  return (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        isUsed
                          ? "w-3 bg-carbon"
                          : isCurrent
                            ? "w-5 bg-signal-lime border border-carbon/40 animate-pulse"
                            : "w-2 bg-terrain/30"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Touch-Friendly Virtual Keyboard */}
            <div className="w-full select-none touch-manipulation">
              {KEYBOARD_ROWS.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5 my-1">
                  {row.map((k) => {
                    const status = keyStatuses[k];
                    const isWide = k === "ENTER" || k === "⌫";

                    let keyClass =
                      "h-10 sm:h-11 md:h-12 rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer active:scale-95 border ";

                    if (isWide) {
                      keyClass += "px-2 sm:px-3 bg-paper border-terrain/40 text-carbon min-w-[42px] sm:min-w-[54px] md:min-w-[62px]";
                    } else if (status === "correct") {
                      keyClass += "bg-signal-lime border-signal-lime text-carbon shadow-2xs min-w-[28px] sm:min-w-[34px] md:min-w-[38px] flex-1";
                    } else if (status === "present") {
                      keyClass += "bg-mist/85 border-mist text-carbon min-w-[28px] sm:min-w-[34px] md:min-w-[38px] flex-1";
                    } else if (status === "absent") {
                      keyClass += "bg-terrain/25 border-terrain/35 text-terrain/60 min-w-[28px] sm:min-w-[34px] md:min-w-[38px] flex-1";
                    } else {
                      keyClass += "bg-white/80 border-terrain/30 text-carbon hover:bg-white min-w-[28px] sm:min-w-[34px] md:min-w-[38px] flex-1 shadow-2xs";
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

            {/* Keyboard helper hints */}
            <div className="hidden lg:flex items-center justify-between w-full text-[10px] font-mono text-terrain/70 px-1">
              <span>Physical keyboard active</span>
              <span>Press <kbd className="px-1 py-0.5 rounded bg-black/5 border border-terrain/30 font-semibold">ENTER</kbd> to submit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Architectural Footer (Hidden in Fullscreen) */}
      {!isFullscreen && <StudioFooter />}

      {/* ========================================================================= */}
      {/* ROUND OUTCOME MODAL (DAILY WORD OR FREE PLAY) */}
      {/* ========================================================================= */}
      {showRoundModal && lastRoundResult && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-terrain">
                  {mode === "daily"
                    ? `WORD OF THE DAY · ${dailyDateKey}`
                    : `FREE PLAY · ROUND ${String(lastRoundResult.roundNumber).padStart(2, "0")}`}
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
                  : "X/6"}
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

            {/* Standing Telemetry */}
            {mode === "free" ? (
              <div className="p-3.5 rounded-2xl bg-white/40 border border-terrain/20 flex items-center justify-between text-xs font-mono">
                <span className="text-terrain">Free Play Session:</span>
                <span className="font-bold text-carbon">
                  {seriesSolvedCount} / {roundHistory.length} Won
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-white/40 border border-terrain/20 flex items-center justify-between text-xs font-mono">
                <span className="text-terrain">Shared Daily Puzzle:</span>
                <span className="font-bold text-carbon">New word every day</span>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {mode === "free" ? (
                <>
                  <button
                    onClick={proceedToNextRound}
                    className="w-full py-3.5 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Next Random Word (Round {String(currentRound + 1).padStart(2, "0")})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-signal-lime" />
                  </button>

                  <button
                    onClick={finishFreePlaySession}
                    className="w-full py-2.5 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Finish &amp; View Score ({roundHistory.length} Played)</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => switchMode("free")}
                  className="w-full py-3.5 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Play Unlimited Random Words (Free Play)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-carbon" />
                </button>
              )}

              <button
                onClick={shareSingleRound}
                className="w-full py-2.5 rounded-full border border-terrain/35 hover:border-carbon text-carbon font-mono text-xs font-medium transition-all flex items-center justify-center gap-2 bg-transparent cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-carbon" />
                    <span>Copied Grid!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-terrain" />
                    <span>{mode === "daily" ? "Share Daily Wordle" : "Share This Round"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FREE PLAY SESSION SCORING SCREEN */}
      {/* ========================================================================= */}
      {showSeriesSummary && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 my-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-terrain/25 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-signal-lime bg-carbon px-2.5 py-0.5 rounded-full inline-block">
                  Session Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-space font-medium text-carbon">
                  Free Play Audit ({roundHistory.length} {roundHistory.length === 1 ? "Round" : "Rounds"})
                </h2>
                <p className="text-xs text-terrain font-light">
                  Your breakdown across {roundHistory.length} random word {roundHistory.length === 1 ? "challenge" : "challenges"}.
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
                  {seriesSolvedCount} / {roundHistory.length}
                </span>
                <span className="text-[10px] text-terrain uppercase">Solved</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 border border-terrain/25">
                <span className="text-2xl sm:text-3xl font-bold text-carbon block">
                  {roundHistory.length > 0
                    ? `${Math.round((seriesSolvedCount / roundHistory.length) * 100)}%`
                    : "0%"}
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
                onClick={() => startNewSeries()}
                className="w-full py-3.5 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 border border-signal-lime/80 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-carbon" />
                <span>Start New Free Play</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={shareSeriesResult}
                  className="flex-1 py-2.5 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedSeriesShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-signal-lime" />
                      <span>Copied Session Grid!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-signal-lime" />
                      <span>Share Session</span>
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

            {/* Current Mode Standing */}
            <div className="p-3.5 rounded-2xl bg-black/5 border border-terrain/20 flex items-center justify-between text-xs font-mono">
              <span className="text-terrain">
                {mode === "daily" ? "Word of the Day:" : "Active Free Play:"}
              </span>
              <span className="font-bold text-carbon">
                {mode === "daily"
                  ? `${dailyDateKey} (${gameStatus === "playing" ? "In Progress" : gameStatus === "won" ? "Solved" : "Missed"})`
                  : `Round ${String(currentRound).padStart(2, "0")} (${seriesSolvedCount} Solved)`}
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

      {/* ========================================================================= */}
      {/* DIFFICULTY SELECTION MODAL */}
      {/* ========================================================================= */}
      {showDifficultyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-terrain" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-terrain">
                    LEXICAL DIFFICULTY TIERS
                  </span>
                </div>
                <h3 className="text-xl font-space font-medium text-carbon">
                  Target Lexicon Preference
                </h3>
              </div>
              <button
                onClick={() => setShowDifficultyModal(false)}
                className="p-1.5 rounded-lg border border-terrain/30 text-carbon hover:bg-black/5 cursor-pointer"
                aria-label="Close difficulty modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-terrain leading-relaxed">
              Tailor the target secret word distribution to your preferred challenge level. All 5,757 valid English words remain acceptable guesses in every mode.
            </p>

            {/* 4 Difficulty Tier Cards */}
            <div className="space-y-2.5">
              {[
                {
                  id: "progressive" as WordleDifficulty,
                  label: "Progressive Series",
                  tag: "Recommended",
                  lexicon: "Top 900 → 5,757 words",
                  desc: "Rounds 1–2 start with familiar words, steadily ramping up to advanced vocabulary in Round 5.",
                },
                {
                  id: "easy" as WordleDifficulty,
                  label: "Easy / Casual",
                  tag: "Top 1,200",
                  lexicon: "1,200 everyday words",
                  desc: "Focuses strictly on common, universally recognizable daily English vocabulary.",
                },
                {
                  id: "medium" as WordleDifficulty,
                  label: "Medium / Standard",
                  tag: "Top 2,800",
                  lexicon: "2,800 classic words",
                  desc: "Balanced lexical challenge matching the classic New York Times Wordle standard.",
                },
                {
                  id: "hard" as WordleDifficulty,
                  label: "Hard / Lexicographer",
                  tag: "5,757 Full",
                  lexicon: "Unrestricted dictionary",
                  desc: "Uncapped master vocabulary including archaic, literary, and rare 5-letter gems.",
                },
              ].map((tier) => {
                const isSelected = pendingDifficulty === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setPendingDifficulty(tier.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-white/80 border-carbon ring-1 ring-carbon shadow-2xs"
                        : "bg-white/40 border-terrain/25 hover:border-terrain/50 hover:bg-white/60"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-signal-lime border-carbon text-carbon"
                          : "border-terrain/40 bg-paper"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-space font-medium text-sm text-carbon">
                          {tier.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-medium ${
                            tier.tag === "Recommended"
                              ? "bg-signal-lime text-carbon font-semibold"
                              : "bg-black/5 text-terrain"
                          }`}
                        >
                          {tier.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-terrain leading-snug">
                        {tier.desc}
                      </p>
                      <div className="text-[10px] font-mono text-terrain/70">
                        Target Pool: <span className="text-carbon font-medium">{tier.lexicon}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => startNewSeries(pendingDifficulty)}
                className="flex-1 py-3 px-4 rounded-full bg-signal-lime text-carbon font-mono text-xs font-semibold hover:bg-signal-lime/90 transition-all cursor-pointer text-center border border-carbon/20 shadow-2xs"
              >
                Apply & Restart Series
              </button>
              <button
                type="button"
                onClick={() => handleApplyDifficultyPreference(pendingDifficulty)}
                className="py-3 px-5 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all cursor-pointer text-center"
              >
                Apply to Next Round
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
