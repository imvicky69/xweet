"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StreetViewArena from "@/components/StreetViewArena";
import CountryGuesserDrawer from "@/components/CountryGuesserDrawer";
import IntelDrawer from "@/components/IntelDrawer";
import RoundResultModal from "@/components/RoundResultModal";
import HowToPlayModal from "@/components/HowToPlayModal";
import Footer from "@/components/Footer";
import { GAME_LOCATIONS, CountryChoice } from "@/data/locations";
import { ArrowLeft, Compass, RotateCcw, Trophy, MapPin, Eye, Code, Layers } from "lucide-react";

export default function PlayPage() {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<CountryChoice | null>(null);

  const [isGuesserOpen, setIsGuesserOpen] = useState(false);
  const [isClueOpen, setIsClueOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const [unlockedClues, setUnlockedClues] = useState<Set<number>>(new Set());
  const [cluePenalty, setCluePenalty] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastPointsEarned, setLastPointsEarned] = useState(0);
  const [isLastGuessCorrect, setIsLastGuessCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const totalRounds = GAME_LOCATIONS.length;
  const currentLocation = GAME_LOCATIONS[currentRoundIndex] || GAME_LOCATIONS[0];

  // Tactile Web Audio Synthesizer
  const playSound = useCallback(
    (type: "click" | "success" | "error" | "intel") => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;
        if (type === "click") {
          osc.frequency.setValueAtTime(440, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
        } else if (type === "intel") {
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(580, now + 0.1);
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
        } else if (type === "success") {
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.08);
          osc.frequency.setValueAtTime(783.99, now + 0.16);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        } else if (type === "error") {
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(180, now + 0.1);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
        }
      } catch {
        // AudioContext disabled
      }
    },
    [soundEnabled]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        if (e.key === "Enter" && isGuesserOpen && selectedCountry) {
          e.preventDefault();
          handleSubmitGuess();
        }
        return;
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!isGuesserOpen && !isResultOpen) {
          setIsGuesserOpen(true);
          playSound("click");
        } else if (isGuesserOpen && selectedCountry) {
          handleSubmitGuess();
        }
      } else if (e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsClueOpen((prev) => !prev);
        playSound("click");
      } else if (e.key === "Escape") {
        setIsGuesserOpen(false);
        setIsClueOpen(false);
        setIsHowToPlayOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleUnlockClue = (clueIndex: number, penalty: number) => {
    if (unlockedClues.has(clueIndex)) return;
    setUnlockedClues((prev) => new Set(prev).add(clueIndex));
    setCluePenalty((prev) => prev + penalty);
    playSound("intel");
  };

  const handleSubmitGuess = () => {
    if (!selectedCountry) return;

    const isMatch =
      selectedCountry.code.toUpperCase() === currentLocation.countryCode.toUpperCase() ||
      selectedCountry.name.toLowerCase() === currentLocation.country.toLowerCase();

    let points = 0;
    if (isMatch) {
      const basePoints = 5000;
      const streakMultiplier = 1 + (streak - 1) * 0.2;
      const netPoints = Math.max(1000, Math.round(basePoints * streakMultiplier) - cluePenalty);
      points = netPoints;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
      setIsLastGuessCorrect(true);
      playSound("success");
    } else {
      const sameContinent = selectedCountry.continent === currentLocation.continent;
      points = sameContinent ? 500 : 0;
      setScore((prev) => prev + points);
      setStreak(1);
      setIsLastGuessCorrect(false);
      playSound("error");
    }

    setLastPointsEarned(points);
    setIsGuesserOpen(false);
    setIsResultOpen(true);
  };

  const handleNextRound = () => {
    setIsResultOpen(false);
    if (currentRoundIndex + 1 < totalRounds) {
      setCurrentRoundIndex((prev) => prev + 1);
      setSelectedCountry(null);
      setUnlockedClues(new Set());
      setCluePenalty(0);
      playSound("click");
    } else {
      setGameCompleted(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentRoundIndex(0);
    setScore(0);
    setStreak(1);
    setSelectedCountry(null);
    setUnlockedClues(new Set());
    setCluePenalty(0);
    setIsResultOpen(false);
    setGameCompleted(false);
    playSound("click");
  };

  return (
    <div className="min-h-screen bg-paper text-carbon font-geist selection:bg-signal-lime selection:text-carbon flex flex-col justify-between">
      {/* Game HUD Navbar */}
      <Navbar
        score={score}
        streak={streak}
        currentRound={currentRoundIndex + 1}
        totalRounds={totalRounds}
        isClueOpen={isClueOpen}
        onToggleClue={() => {
          setIsClueOpen((prev) => !prev);
          playSound("click");
        }}
        onOpenHowToPlay={() => {
          setIsHowToPlayOpen(true);
          playSound("click");
        }}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Breadcrumb / Phase Banner */}
      <div className="border-b border-terrain/20 bg-black/[0.015] py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-terrain hover:text-carbon transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Base Station (Home)</span>
            </Link>
            <span className="text-terrain/40">•</span>
            <span className="text-carbon font-medium">Recon Arena (MVP Mode)</span>
          </div>

          <button
            onClick={() => setShowRoadmap((prev) => !prev)}
            className="cursor-pointer text-xs text-terrain hover:text-carbon underline decoration-terrain/50 hover:decoration-carbon flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Next Phase Plan: Google Maps API &amp; Dynamic Scoring</span>
          </button>
        </div>
      </div>

      {/* Phase 2 Architecture & Planning Notice */}
      {showRoadmap && (
        <div className="bg-mist/15 border-b border-mist/40 p-4 sm:p-6 transition-all animate-in fade-in">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-carbon" />
                <span className="text-xs font-mono uppercase tracking-wider text-carbon font-semibold">
                  Phase 2 Implementation Scope
                </span>
              </div>
              <p className="text-xs text-carbon/80 max-w-3xl leading-relaxed">
                Currently running in curated reconnaissance mode with 360° panoramas and country boundary matching.
                Next phase will integrate the live <strong>Google Maps JavaScript SDK (StreetViewPanorama + Geometry Library)</strong>,
                dynamic Haversine polygon distance penalties, randomized global lat/long generation, and multiplayer expedition rooms.
              </p>
            </div>
            <button
              onClick={() => setShowRoadmap(false)}
              className="cursor-pointer text-xs font-mono text-terrain hover:text-carbon border border-terrain/30 px-3 py-1 rounded-lg"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Game Screen */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6">
        {gameCompleted ? (
          <div className="border border-terrain/35 rounded-3xl p-8 sm:p-14 bg-white/40 backdrop-blur-md shadow-xl text-center max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-3xl bg-signal-lime text-carbon flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-terrain">
                MISSION DEBRIEF • EXPEDITION COMPLETED
              </span>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-carbon">
                Reconnaissance Concluded
              </h1>
              <p className="font-playwrite text-2xl text-terrain pt-1">
                You surveyed all {totalRounds} global territories
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-paper border border-terrain/30">
                <span className="text-[11px] font-mono text-terrain uppercase block">
                  Final Score
                </span>
                <span className="text-3xl font-semibold font-mono text-carbon">
                  {score.toLocaleString()}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-paper border border-terrain/30">
                <span className="text-[11px] font-mono text-terrain uppercase block">
                  Best Streak
                </span>
                <span className="text-3xl font-semibold font-mono text-carbon">
                  {streak}x
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <Link
                href="/"
                className="cursor-pointer border border-terrain/40 hover:border-carbon text-carbon font-medium px-6 py-3 rounded-2xl transition-all"
              >
                Back to Home
              </Link>
              <button
                onClick={handleRestartGame}
                className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold px-8 py-3.5 rounded-2xl shadow-md transition-all duration-200 inline-flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Start New Expedition</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <StreetViewArena
              location={currentLocation}
              onOpenGuesser={() => {
                setIsGuesserOpen(true);
                playSound("click");
              }}
              selectedCountryName={selectedCountry ? selectedCountry.name : null}
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-terrain/25 bg-white/40 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-carbon/5 border border-terrain/30 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-carbon" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-carbon font-semibold block">
                    Observation Viewport
                  </span>
                  <span className="text-xs text-terrain">
                    Analyze the sun azimuth, vegetation, and architecture before guessing.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    setIsClueOpen(true);
                    playSound("click");
                  }}
                  className="cursor-pointer px-4 py-2 rounded-xl border border-terrain/30 hover:border-carbon text-xs font-mono text-terrain hover:text-carbon transition-colors flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Field Intel</span>
                  {unlockedClues.size > 0 && (
                    <span className="w-2 h-2 rounded-full bg-mist" />
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsGuesserOpen(true);
                    playSound("click");
                  }}
                  className="cursor-pointer bg-signal-lime hover:bg-[#cbf056] text-carbon font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 hover:scale-102 active:scale-98"
                >
                  <MapPin className="w-4 h-4 text-carbon" />
                  <span>
                    {selectedCountry ? `Locked: ${selectedCountry.name}` : "Pick Country"}
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <CountryGuesserDrawer
        isOpen={isGuesserOpen}
        onClose={() => setIsGuesserOpen(false)}
        selectedCountry={selectedCountry}
        onSelectCountry={(c) => {
          setSelectedCountry(c);
          playSound("click");
        }}
        onSubmitGuess={handleSubmitGuess}
      />

      <IntelDrawer
        isOpen={isClueOpen}
        onClose={() => setIsClueOpen(false)}
        location={currentLocation}
        unlockedClues={unlockedClues}
        onUnlockClue={handleUnlockClue}
      />

      <RoundResultModal
        isOpen={isResultOpen}
        location={currentLocation}
        guessedCountry={selectedCountry}
        pointsEarned={lastPointsEarned}
        isCorrect={isLastGuessCorrect}
        currentRound={currentRoundIndex + 1}
        totalRounds={totalRounds}
        onNextRound={handleNextRound}
        onPlayAgain={handleRestartGame}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <Footer
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
      />
    </div>
  );
}
