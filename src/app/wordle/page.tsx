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
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

// Curated 5-letter target words (tactile, cartographic, nature, tech themes)
const WORD_LIST = [
  "ADULT", "ALERT", "ALIGN", "ALPHA", "AMBER", "ANGEL", "ANVIL", "APPLE",
  "ARENA", "ARRAY", "ARROW", "ASYNC", "ATLAS", "ATOLL", "AWARE", "BAKER",
  "BASIC", "BASIN", "BEACH", "BEAMS", "BENCH", "BIRCH", "BLAND", "BLAZE",
  "BLOCK", "BLOOM", "BLUFF", "BLUNT", "BOUND", "BRAIN", "BRAVE", "BREAD",
  "BRICK", "BRIEF", "BROAD", "BROOK", "BYTES", "CABLE", "CACHE", "CAMEL",
  "CANDY", "CANON", "CARGO", "CEDAR", "CHAIR", "CHARM", "CHART", "CHASM",
  "CHESS", "CHEST", "CHIEF", "CIVIC", "CLAIM", "CLEAN", "CLEAR", "CLIFF",
  "CLIMB", "CLOCK", "CLOTH", "CLOUD", "COAST", "COMET", "CORAL", "CRAFT",
  "CRAGS", "CRANE", "CREEK", "CREST", "CROWN", "CRYPT", "DAILY", "DANCE",
  "DEBUG", "DECOR", "DELTA", "DIGIT", "DOMES", "DRAFT", "DREAM", "DRIFT",
  "DRIVE", "DUNES", "EAGLE", "EARLY", "EARTH", "ELITE", "EMBER", "ENTRY",
  "EQUAL", "ERROR", "ESSAY", "EVENT", "EXACT", "FAITH", "FAUNA", "FEAST",
  "FETCH", "FIBER", "FIELD", "FINAL", "FIRST", "FJORD", "FLAIR", "FLAME",
  "FLARE", "FLASH", "FLEET", "FLOAT", "FLOOR", "FLORA", "FLUID", "FLUTE",
  "FOCUS", "FORGE", "FRAME", "FRESH", "FRONT", "FROST", "GAMMA", "GHOST",
  "GIANT", "GLASS", "GLOBE", "GLORY", "GLYPH", "GRACE", "GRAIN", "GRAND",
  "GRASS", "GREEN", "GROVE", "GUARD", "GUIDE", "GULCH", "HAPPY", "HAVEN",
  "HEART", "HEAVY", "HINGE", "HONOR", "HOTEL", "HOUSE", "HUMAN", "IMAGE",
  "INBOX", "INDEX", "INNER", "INPUT", "IRONY", "ISLES", "IVORY", "JEWEL",
  "JUDGE", "JUICE", "KNIFE", "LABOR", "LAKES", "LASER", "LATCH", "LEMON",
  "LEVEL", "LEVER", "LIGHT", "LOCAL", "LODGE", "LOGIC", "LUCID", "LUCKY",
  "LUNAR", "MACRO", "MAGIC", "MAJOR", "MAKER", "MANGO", "MANOR", "MAPLE",
  "MARCH", "MARSH", "MATCH", "MEDAL", "MEDIA", "METAL", "METER", "MICRO",
  "MINER", "MIXER", "MODEL", "MODEM", "MONEY", "MOTIF", "MOTOR", "MOUNT",
  "MUSIC", "NEXUS", "NIGHT", "NOBLE", "NORTH", "NURSE", "OASIS", "OCEAN",
  "OFFER", "OLIVE", "OMEGA", "ONION", "OPERA", "ORBIT", "ORDER", "PAINT",
  "PANEL", "PAPER", "PARSE", "PARTY", "PATCH", "PAUSE", "PEACE", "PEACH",
  "PEAKS", "PEARL", "PENAL", "PENNY", "PHASE", "PHONE", "PHOTO", "PIANO",
  "PIERS", "PILOT", "PINES", "PIQUE", "PITCH", "PIVOT", "PIXEL", "PIZZA",
  "PLAIN", "PLANE", "PLANT", "PLATE", "PLAZA", "PLUTO", "POINT", "POLAR",
  "POUND", "POWER", "PRICE", "PRIDE", "PRIME", "PRINT", "PRISM", "PRIZE",
  "PROBE", "PROOF", "PROUD", "PROXY", "PULSE", "PUPIL", "QUEEN", "QUERY",
  "QUEST", "QUEUE", "QUICK", "QUIET", "RADAR", "RADIO", "RANCH", "RANGE",
  "RAPID", "RATIO", "REACH", "REEFS", "RELAX", "RESET", "RIDER", "RIDGE",
  "RIVAL", "RIVER", "ROBOT", "ROUND", "ROUTE", "ROVER", "ROYAL", "RULER",
  "SALAD", "SAUCE", "SCALE", "SCENE", "SCOPE", "SCORE", "SCOUT", "SENSE",
  "SERIF", "SERVE", "SHADE", "SHAPE", "SHARK", "SHARP", "SHELL", "SHIFT",
  "SHINE", "SHIRT", "SHORE", "SIGHT", "SIGMA", "SKILL", "SLEEP", "SLOPE",
  "SMART", "SMILE", "SMOKE", "SOLAR", "SOLID", "SOLVE", "SOUND", "SOUTH",
  "SPACE", "SPARK", "SPAWN", "SPEED", "SPICE", "SPORT", "STACK", "STAGE",
  "STAMP", "STAND", "STARK", "STARS", "STATE", "STEAM", "STEEL", "STERN",
  "STICK", "STILL", "STONE", "STORE", "STORM", "SUGAR", "SUITE", "SUPER",
  "SURGE", "SWEET", "SWIFT", "TABLE", "TANGY", "TASTE", "TERRA", "THEME",
  "THUMB", "TIDES", "TIGER", "TILES", "TITAN", "TITLE", "TOAST", "TOKEN",
  "TOPIC", "TOTAL", "TOUCH", "TOWEL", "TOWER", "TRACE", "TRACK", "TRAIL",
  "TRAIN", "TREES", "TRUCK", "TRUTH", "TULIP", "UNCLE", "UNION", "UNITY",
  "URBAN", "VALES", "VALET", "VALOR", "VALUE", "VALVE", "VAPID", "VAPOR",
  "VAULT", "VENUS", "VIDEO", "VIGOR", "VIRUS", "VISIT", "VISTA", "VITAL",
  "VIVID", "VOICE", "VOTER", "WAGON", "WATCH", "WATER", "WHARF", "WHEAT",
  "WHEEL", "WHITE", "WHOLE", "WINDY", "WOODS", "WORLD", "WORRY", "WRIST",
  "YIELD", "YOUTH", "ZEBRA", "ZESTY",
].filter((w) => w.length === 5);

type TileState = "empty" | "tbd" | "correct" | "present" | "absent";

interface Stats {
  played: number;
  won: number;
  streak: number;
  maxStreak: number;
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
  // All letters missing entirely from the target word
  const allMissing = totalMatched === 0;
  // Close: almost 5 letters found (all 5 letters matched / near anagram) OR 4 exact letters correct
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
  const [targetWord, setTargetWord] = useState<string>("EARTH");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({ played: 0, won: 0, streak: 0, maxStreak: 0 });
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Initialize audio elements & load sound preferences
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
    }
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

  // Pick a random word and load stats on client mount
  useEffect(() => {
    const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(randomWord);

    try {
      const saved = localStorage.getItem("wordle_stats") || localStorage.getItem("xwordle_stats");
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleKey = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      const upper = key.toUpperCase();

      if (upper === "BACKSPACE" || upper === "⌫") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (upper === "ENTER") {
        if (currentGuess.length !== 5) {
          triggerToast("Needs 5 letters");
          return;
        }

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === targetWord) {
          playSound("correct");
          setGameStatus("won");
          setStats((prev) => {
            const updated = {
              played: prev.played + 1,
              won: prev.won + 1,
              streak: prev.streak + 1,
              maxStreak: Math.max(prev.maxStreak, prev.streak + 1),
            };
            try {
              localStorage.setItem("wordle_stats", JSON.stringify(updated));
            } catch { }
            return updated;
          });
          setTimeout(() => setShowStats(true), 800);
        } else {
          // Audio feedback triggers on guess precision
          const evalResult = evaluateGuess(currentGuess, targetWord);
          if (evalResult.allMissing) {
            playSound("boom");
          } else if (evalResult.isClose) {
            playSound("close");
          }

          if (newGuesses.length >= 6) {
            setGameStatus("lost");
            setStats((prev) => {
              const updated = {
                played: prev.played + 1,
                won: prev.won,
                streak: 0,
                maxStreak: prev.maxStreak,
              };
              try {
                localStorage.setItem("wordle_stats", JSON.stringify(updated));
              } catch { }
              return updated;
            });
            setTimeout(() => setShowStats(true), 800);
          }
        }
        return;
      }

      if (/^[A-Z]$/.test(upper) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + upper);
      }
    },
    [currentGuess, guesses, gameStatus, targetWord, playSound]
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

  // Restart new game
  const resetGame = () => {
    try {
      Object.values(audioRef.current).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    } catch {}
    const nextWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    setTargetWord(nextWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
    setShowStats(false);
    triggerToast("New word ready");
  };

  // Evaluate letter tile states
  const getTileState = (guess: string, index: number): TileState => {
    const letter = guess[index];
    if (letter === targetWord[index]) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
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

  // Share score generator
  const shareResult = () => {
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

    const shareText = `Wordle ${gameStatus === "won" ? guesses.length : "X"}/6\n\n${rows.join("\n")}\n\nhttps://xweet.in/wordle`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // On-screen keyboard rows
  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
  ];

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Studio Navigation */}
      <StudioNavbar />

      <main className="flex-1 w-full max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center justify-between">
        {/* ========================================================================= */}
        {/* SUB-HEADER & CONTROLS */}
        {/* ========================================================================= */}
        <div className="w-full flex items-center justify-between border-b border-terrain/25 pb-3">
          <Link
            href="/games"
            className="flex items-center gap-1.5 text-xs font-mono text-terrain hover:text-carbon transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Games</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-playwrite text-2xl tracking-tight text-carbon">
              wordle
            </span>
            <span className="text-[10px] font-mono uppercase bg-carbon text-paper px-2 py-0.5 rounded-full font-medium">
              Daily
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleMute}
              className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation"
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
              aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-terrain/60" />
              ) : (
                <Volume2 className="w-4 h-4 text-carbon" />
              )}
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation"
              title="How to Play"
              aria-label="How to Play"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowStats(true)}
              className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation"
              title="Statistics"
              aria-label="Statistics"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
            <button
              onClick={resetGame}
              className="p-1.5 sm:p-2 rounded-xl border border-terrain/30 hover:border-carbon text-terrain hover:text-carbon transition-colors touch-manipulation"
              title="New Word"
              aria-label="New Word"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 z-50 bg-carbon text-paper px-4 py-2 rounded-full text-xs font-mono shadow-md animate-in fade-in slide-in-from-top-2">
            {toastMessage}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6x5 LETTER GRID (Optimized for Mobile Phone Screens) */}
        {/* ========================================================================= */}
        <div className="my-auto py-4 sm:py-6 flex flex-col gap-1.5 sm:gap-2">
          {Array.from({ length: 6 }).map((_, rowIndex) => {
            const isCurrentRow = rowIndex === guesses.length;
            const rowGuess = guesses[rowIndex] || (isCurrentRow ? currentGuess : "");

            return (
              <div key={rowIndex} className="flex gap-1.5 sm:gap-2 justify-center">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const letter = rowGuess[colIndex] || "";
                  const isSubmitted = rowIndex < guesses.length;
                  const state: TileState = isSubmitted
                    ? getTileState(guesses[rowIndex], colIndex)
                    : letter
                      ? "tbd"
                      : "empty";

                  let styleClass =
                    "w-12 h-12 sm:w-14 sm:h-14 border rounded-xl flex items-center justify-center text-lg sm:text-2xl font-mono uppercase transition-all duration-300 ";

                  if (state === "correct") {
                    styleClass += "bg-signal-lime text-carbon border-signal-lime font-bold shadow-xs";
                  } else if (state === "present") {
                    styleClass += "bg-mist/75 text-carbon border-mist/90 font-bold";
                  } else if (state === "absent") {
                    styleClass += "bg-terrain/20 text-terrain/70 border-terrain/30";
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

        {/* ========================================================================= */}
        {/* TOUCH-FRIENDLY VIRTUAL KEYBOARD */}
        {/* ========================================================================= */}
        <div className="w-full max-w-md pb-2 select-none touch-manipulation">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5 my-1">
              {row.map((k) => {
                const status = keyStatuses[k];
                const isWide = k === "ENTER" || k === "⌫";

                let keyClass =
                  "h-11 sm:h-12 rounded-lg font-mono text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer active:scale-95 border ";

                if (isWide) {
                  keyClass += "px-2.5 sm:px-3.5 bg-paper border-terrain/40 text-carbon min-w-[40px] sm:min-w-[54px]";
                } else if (status === "correct") {
                  keyClass += "bg-signal-lime border-signal-lime text-carbon shadow-2xs min-w-[28px] sm:min-w-[34px] flex-1";
                } else if (status === "present") {
                  keyClass += "bg-mist/80 border-mist text-carbon min-w-[28px] sm:min-w-[34px] flex-1";
                } else if (status === "absent") {
                  keyClass += "bg-terrain/25 border-terrain/35 text-terrain/60 min-w-[28px] sm:min-w-[34px] flex-1";
                } else {
                  keyClass += "bg-white/80 border-terrain/30 text-carbon hover:bg-white min-w-[28px] sm:min-w-[34px] flex-1 shadow-2xs";
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
      </main>

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
                  HOW TO PLAY
                </span>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1.5 rounded-lg border border-terrain/30 text-carbon hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-carbon/80 font-light leading-relaxed">
              Deduce the secret <strong>5-letter word</strong> in 6 attempts. Each guess must be a valid 5-letter word. Press Enter to submit.
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
                  <div className="w-9 h-9 rounded-lg bg-mist/80 text-carbon font-bold flex items-center justify-center border border-mist">
                    O
                  </div>
                  <span className="text-carbon/90 text-xs">
                    <strong>Mist (Purple)</strong>: Letter is in the word, but in the wrong spot.
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-terrain/25 text-terrain/70 font-medium flex items-center justify-center border border-terrain/35">
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
                className="w-full py-3 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all"
              >
                Got It · Start Guessing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATS & ROUND COMPLETE MODAL */}
      {/* ========================================================================= */}
      {showStats && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper border border-terrain/35 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-terrain/20 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-terrain">
                  GAME STATUS
                </span>
                <h3 className="text-xl font-space font-medium text-carbon">
                  {gameStatus === "won"
                    ? "Splendid Deduction!"
                    : gameStatus === "lost"
                      ? "Game Over"
                      : "Studio Statistics"}
                </h3>
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="p-1.5 rounded-lg border border-terrain/30 text-carbon hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Revealed word when lost */}
            {gameStatus === "lost" && (
              <div className="p-3 rounded-2xl bg-black/5 border border-terrain/25 text-center font-mono text-xs">
                <span className="text-terrain block">The secret word was:</span>
                <span className="text-lg font-bold text-carbon tracking-widest">{targetWord}</span>
              </div>
            )}

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
            <div className="space-y-2 pt-2">
              {gameStatus !== "playing" && (
                <button
                  onClick={shareResult}
                  className="w-full py-3 rounded-full bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs font-mono transition-all flex items-center justify-center gap-2 border border-signal-lime/80 shadow-xs"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-4 h-4 text-carbon" />
                      <span>Copied Score to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-carbon" />
                      <span>Share Deduction Grid</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={resetGame}
                className="w-full py-3 rounded-full bg-carbon text-paper font-mono text-xs font-semibold hover:bg-carbon/90 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-signal-lime" />
                <span>Play Another Word</span>
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
