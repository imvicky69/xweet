import { VERIFIED_LOCATIONS, VerifiedLocation } from "./locations";
import { COUNTRY_BY_CODE, Country } from "@/data/countries";

export interface RoundGuess {
  roundIndex: number;
  selectedCountryCode: string;
  selectedCountryName: string;
  isCorrect: boolean;
  points: number;
  actualCountryCode: string;
  actualCountryName: string;
  locationId: string;
  lat: number;
  lng: number;
}

export interface GameSession {
  id: string;
  startedAt: number;
  locations: VerifiedLocation[];
  guesses: RoundGuess[];
  score: number;
  isCompleted: boolean;
}

export interface ClientRoundPayload {
  roundIndex: number;
  totalRounds: number;
  location: {
    id: string;
    lat: number;
    lng: number;
    heading?: number;
    pitch?: number;
  };
}

// Cache for game sessions attached to globalThis to survive Next.js Fast Refresh & dev server recompilations
declare global {
  // eslint-disable-next-line no-var
  var __unkn_game_sessions: Map<string, GameSession> | undefined;
}

const sessions: Map<string, GameSession> =
  globalThis.__unkn_game_sessions ?? new Map<string, GameSession>();

if (process.env.NODE_ENV !== "production") {
  globalThis.__unkn_game_sessions = sessions;
}

function cleanupOldSessions() {
  const now = Date.now();
  const maxAge = 4 * 60 * 60 * 1000; // 4 hours
  for (const [id, session] of sessions.entries()) {
    if (now - session.startedAt > maxAge) {
      sessions.delete(id);
    }
  }
}

// Fisher-Yates shuffle helper
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function createGameSession(): { gameId: string; initialRound: ClientRoundPayload } {
  cleanupOldSessions();

  const gameId = `exp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const shuffledLocations = shuffle(VERIFIED_LOCATIONS).slice(0, 10);

  const session: GameSession = {
    id: gameId,
    startedAt: Date.now(),
    locations: shuffledLocations,
    guesses: [],
    score: 0,
    isCompleted: false,
  };

  sessions.set(gameId, session);

  const firstLocation = shuffledLocations[0];
  const initialRound: ClientRoundPayload = {
    roundIndex: 0,
    totalRounds: 10,
    location: {
      id: firstLocation.id,
      lat: firstLocation.lat,
      lng: firstLocation.lng,
      heading: firstLocation.heading,
      pitch: firstLocation.pitch,
    },
  };

  return { gameId, initialRound };
}

export function getSession(gameId: string): GameSession | undefined {
  return sessions.get(gameId);
}

export function evaluateGuess(
  gameId: string,
  roundIndex: number,
  selectedCountryCode: string
): {
  success: boolean;
  error?: string;
  isCorrect?: boolean;
  actualCountry?: Country;
  selectedCountry?: Country;
  pointsEarned?: number;
  totalScore?: number;
  roundIndex?: number;
  isCompleted?: boolean;
  nextRound?: ClientRoundPayload;
} {
  const session = sessions.get(gameId);
  if (!session) {
    return { success: false, error: "Session not found or expired. Please start a new expedition." };
  }

  // Prevent duplicate submissions or skipped rounds
  if (session.guesses.length !== roundIndex) {
    return {
      success: false,
      error: `Invalid round index: expected round ${session.guesses.length + 1}, got round ${roundIndex + 1}.`,
    };
  }

  if (roundIndex >= 10 || session.isCompleted) {
    return { success: false, error: "This expedition is already completed." };
  }

  const expectedLocation = session.locations[roundIndex];
  const normalizedSelectedCode = selectedCountryCode.trim().toUpperCase();
  const normalizedActualCode = expectedLocation.countryCode.trim().toUpperCase();

  const isCorrect = normalizedSelectedCode === normalizedActualCode;
  const pointsEarned = isCorrect ? 1 : 0;

  session.score += pointsEarned;

  const actualCountry =
    COUNTRY_BY_CODE.get(normalizedActualCode) || {
      name: expectedLocation.countryName,
      code: normalizedActualCode,
      continent: "World",
      flag: "🌐",
    };

  const selectedCountry =
    COUNTRY_BY_CODE.get(normalizedSelectedCode) || {
      name: normalizedSelectedCode,
      code: normalizedSelectedCode,
      continent: "World",
      flag: "🌐",
    };

  session.guesses.push({
    roundIndex,
    selectedCountryCode: normalizedSelectedCode,
    selectedCountryName: selectedCountry.name,
    isCorrect,
    points: pointsEarned,
    actualCountryCode: normalizedActualCode,
    actualCountryName: actualCountry.name,
    locationId: expectedLocation.id,
    lat: expectedLocation.lat,
    lng: expectedLocation.lng,
  });

  const nextIndex = roundIndex + 1;
  const isCompleted = nextIndex >= 10;
  session.isCompleted = isCompleted;

  let nextRound: ClientRoundPayload | undefined = undefined;
  if (!isCompleted) {
    const nextLoc = session.locations[nextIndex];
    nextRound = {
      roundIndex: nextIndex,
      totalRounds: 10,
      location: {
        id: nextLoc.id,
        lat: nextLoc.lat,
        lng: nextLoc.lng,
        heading: nextLoc.heading,
        pitch: nextLoc.pitch,
      },
    };
  }

  return {
    success: true,
    isCorrect,
    actualCountry,
    selectedCountry,
    pointsEarned,
    totalScore: session.score,
    roundIndex,
    isCompleted,
    nextRound,
  };
}

export function getSummary(gameId: string) {
  const session = sessions.get(gameId);
  if (!session) return null;

  const correctCount = session.guesses.filter((g) => g.isCorrect).length;
  const accuracyPercentage = Math.round((correctCount / 10) * 100);

  const roundsSummary = session.guesses.map((g, idx) => {
    const actual = COUNTRY_BY_CODE.get(g.actualCountryCode) || {
      name: g.actualCountryName,
      code: g.actualCountryCode,
      continent: "World",
      flag: "🌐",
    };
    const selected = COUNTRY_BY_CODE.get(g.selectedCountryCode) || {
      name: g.selectedCountryName,
      code: g.selectedCountryCode,
      continent: "World",
      flag: "🌐",
    };

    return {
      roundNumber: idx + 1,
      actualCountry: actual,
      selectedCountry: selected,
      isCorrect: g.isCorrect,
      points: g.points,
      coordinates: { lat: g.lat, lng: g.lng },
    };
  });

  return {
    gameId: session.id,
    startedAt: session.startedAt,
    completedAt: Date.now(),
    finalScore: session.score,
    totalRounds: 10,
    correctCount,
    accuracyPercentage,
    rounds: roundsSummary,
  };
}
