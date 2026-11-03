"use client";

import { useState, useCallback, useEffect } from "react";
import GameHeader from "@/components/play/GameHeader";
import StreetViewExplorer from "@/components/play/StreetViewExplorer";
import CountryGuessPanel from "@/components/play/CountryGuessPanel";
import RoundResult from "@/components/play/RoundResult";
import ExpeditionSummary, { SummaryRoundItem } from "@/components/play/ExpeditionSummary";
import AuthModal from "@/components/play/AuthModal";
import Footer from "@/components/Footer";
import { Country } from "@/data/countries";
import { AuthProvider, useAuth } from "@/lib/firebase/authContext";
import { saveExpeditionToFirestore } from "@/lib/firebase/firestore";
import {
  Compass,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export type GameStatus =
  | "ready"
  | "loading-location"
  | "playing"
  | "submitting-guess"
  | "result"
  | "completed"
  | "error";

interface CurrentLocationData {
  id: string;
  lat: number;
  lng: number;
  heading?: number;
  pitch?: number;
}

interface LastRoundResultData {
  isCorrect: boolean;
  actualCountry: Country;
  selectedCountry: Country;
  pointsEarned: number;
}

function PlayController() {
  const { user } = useAuth();

  const [status, setStatus] = useState<GameStatus>("ready");
  const [gameId, setGameId] = useState<string | null>(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [currentLocation, setCurrentLocation] = useState<CurrentLocationData | null>(null);
  const [nextLocation, setNextLocation] = useState<CurrentLocationData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const [score, setScore] = useState<number>(0);
  const [pastResults, setPastResults] = useState<boolean[]>([]);
  const [lastRoundResult, setLastRoundResult] = useState<LastRoundResultData | null>(null);
  const [completedRounds, setCompletedRounds] = useState<SummaryRoundItem[]>([]);
  const [isSavedToFirestore, setIsSavedToFirestore] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const totalRounds = 10;

  // 1. Start a New Game
  const startExpedition = useCallback(async () => {
    setStatus("loading-location");
    setErrorMessage(null);
    setScore(0);
    setPastResults([]);
    setLastRoundResult(null);
    setCompletedRounds([]);
    setIsSavedToFirestore(false);
    setSelectedCountry(null);
    setNextLocation(null);

    try {
      const res = await fetch("/api/game/start", { method: "POST" });
      const data = await res.json();

      if (!data.success || !data.gameId || !data.initialRound) {
        throw new Error(data.error || "Failed to initialize game.");
      }

      setGameId(data.gameId);
      setCurrentRoundIndex(0);
      setCurrentLocation(data.initialRound.location);
      setStatus("playing");
    } catch (err: unknown) {
      console.error("Game initialization error:", err);
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to contact game server.");
    }
  }, []);

  // 2. Submit Country Guess
  const handleSubmitGuess = async () => {
    if (!gameId || !selectedCountry || status !== "playing") return;

    setStatus("submitting-guess");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/game/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId,
          roundIndex: currentRoundIndex,
          selectedCountryCode: selectedCountry.code,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to evaluate guess.");
      }

      const isCorrect: boolean = Boolean(data.isCorrect);
      const pointsEarned: number = Number(data.pointsEarned) || 0;

      setScore(data.totalScore);
      setPastResults((prev) => [...prev, isCorrect]);

      setLastRoundResult({
        isCorrect,
        actualCountry: data.actualCountry,
        selectedCountry: data.selectedCountry,
        pointsEarned,
      });

      // Record in local round audit trail
      setCompletedRounds((prev) => [
        ...prev,
        {
          roundNumber: currentRoundIndex + 1,
          actualCountry: data.actualCountry,
          selectedCountry: data.selectedCountry,
          isCorrect,
          points: pointsEarned,
          coordinates: currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined,
        },
      ]);

      // Cache next location; will transition only when player clicks "Next Round"
      if (data.nextRound) {
        setNextLocation(data.nextRound.location);
      }

      setStatus("result");
    } catch (err: unknown) {
      console.error("Guess evaluation error:", err);
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit guess.");
    }
  };

  // 3. Advance to Next Round or Complete Game
  const handleNextRound = () => {
    if (currentRoundIndex + 1 < totalRounds) {
      setCurrentRoundIndex((prev) => prev + 1);
      if (nextLocation) {
        setCurrentLocation(nextLocation);
        setNextLocation(null);
      }
      setSelectedCountry(null);
      setLastRoundResult(null);
      setStatus("playing");
    } else {
      // Completed round 10!
      setStatus("completed");
    }
  };

  // 4. Auto-save to Firestore if authenticated on completion
  useEffect(() => {
    if (status === "completed" && user && gameId && !isSavedToFirestore) {
      const correctCount = completedRounds.filter((r) => r.isCorrect).length;
      saveExpeditionToFirestore({
        gameId,
        userId: user.uid,
        userEmail: user.email,
        finalScore: score,
        totalRounds: 10,
        correctCount,
        accuracyPercentage: Math.round((correctCount / 10) * 100),
        rounds: completedRounds,
      }).then((res) => {
        if (res.success) {
          setIsSavedToFirestore(true);
        }
      });
    }
  }, [status, user, gameId, isSavedToFirestore, score, completedRounds]);

  const correctCount = pastResults.filter(Boolean).length;
  const isPlayingGame = status === "playing" || status === "submitting-guess" || status === "result";

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Game Header */}
      <GameHeader
        currentRound={currentRoundIndex + 1}
        totalRounds={totalRounds}
        correctCount={correctCount}
        pastResults={pastResults}
        isPlaying={isPlayingGame}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Gameplay Screen Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Error Notification */}
        {status === "error" && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage || "An unexpected error occurred."}</span>
            </div>
            <button
              onClick={startExpedition}
              className="cursor-pointer px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 font-mono text-[11px] text-red-900 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* State 1: Ready Screen */}
        {status === "ready" && (
          <div className="border border-terrain/35 rounded-3xl p-8 sm:p-14 bg-white/50 backdrop-blur-md shadow-lg text-center max-w-2xl mx-auto space-y-8 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-signal-lime text-carbon flex items-center justify-center mx-auto shadow-md">
              <Compass className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-signal-lime bg-carbon px-2.5 py-0.5 rounded-full inline-block">
                10-Round Geography Challenge
              </span>
              <h1 className="text-4xl sm:text-5xl font-space font-medium text-carbon pt-1">
                Guess the Country
              </h1>
              <p className="text-sm sm:text-base text-terrain font-light max-w-lg mx-auto leading-relaxed">
                You will be dropped into <strong className="text-carbon font-medium">10 real Google Street View locations</strong>. Explore the roads, read clues from the surroundings, and guess which country you are in.
              </p>
            </div>

            {/* Rules Quick Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left font-mono text-xs max-w-lg mx-auto">
              <div className="p-3.5 rounded-2xl bg-paper border border-terrain/30 space-y-1">
                <span className="text-signal-lime text-[10px] block font-semibold">RULE 01</span>
                <span className="text-carbon font-medium block">10 Locations</span>
                <span className="text-terrain text-[11px] leading-tight block">
                  Curated 360° panoramas worldwide.
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-paper border border-terrain/30 space-y-1">
                <span className="text-signal-lime text-[10px] block font-semibold">RULE 02</span>
                <span className="text-carbon font-medium block">1 Point / Match</span>
                <span className="text-terrain text-[11px] leading-tight block">
                  1 pt for correct country, 0 for miss.
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-paper border border-terrain/30 space-y-1">
                <span className="text-signal-lime text-[10px] block font-semibold">RULE 03</span>
                <span className="text-carbon font-medium block">Pure Clues</span>
                <span className="text-terrain text-[11px] leading-tight block">
                  Look at signs, road lines &amp; sun direction.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={startExpedition}
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-base px-10 py-4 rounded-full transition-all duration-200 shadow-md inline-flex items-center gap-3 hover:scale-105 active:scale-95 border border-signal-lime/90"
              >
                <span>Start Game</span>
                <ArrowRight className="w-5 h-5 text-carbon" />
              </button>
            </div>
          </div>
        )}

        {/* State 2 & 3 & 4: Loading Location & Playing & Submitting */}
        {(status === "loading-location" ||
          status === "playing" ||
          status === "submitting-guess" ||
          status === "result") && (
          <div className="space-y-4">
            {/* Real Street View Panorama Explorer (stable key preserves WebGL context across rounds) */}
            {currentLocation ? (
              <StreetViewExplorer
                key="street-view-main-explorer"
                location={currentLocation}
                onError={(msg) => setErrorMessage(msg)}
              />
            ) : (
              <div className="h-[480px] rounded-3xl bg-carbon/5 border border-terrain/30 flex items-center justify-center text-terrain text-xs font-mono">
                Loading Street View location...
              </div>
            )}

            {/* Active Control Bar: Either Country Selector or Round Result */}
            {status === "result" && lastRoundResult ? (
              <RoundResult
                isCorrect={lastRoundResult.isCorrect}
                actualCountry={lastRoundResult.actualCountry}
                selectedCountry={lastRoundResult.selectedCountry}
                pointsEarned={lastRoundResult.pointsEarned}
                currentRound={currentRoundIndex + 1}
                totalRounds={totalRounds}
                onNextRound={handleNextRound}
              />
            ) : (
              <CountryGuessPanel
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
                onSubmitGuess={handleSubmitGuess}
                isSubmitting={status === "submitting-guess"}
                disabled={status === "loading-location"}
              />
            )}
          </div>
        )}

        {/* State 5: Completed Expedition Summary */}
        {status === "completed" && (
          <ExpeditionSummary
            finalScore={score}
            totalRounds={totalRounds}
            correctCount={correctCount}
            accuracyPercentage={Math.round((correctCount / totalRounds) * 100)}
            rounds={completedRounds}
            onPlayAgain={startExpedition}
            isSaved={isSavedToFirestore}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Architectural Telemetry Footer */}
      <Footer
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenHowToPlay={() => {}}
      />
    </div>
  );
}

export default function PlayPage() {
  return (
    <AuthProvider>
      <PlayController />
    </AuthProvider>
  );
}
