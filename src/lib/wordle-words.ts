import wordsData from "../../public/words.json";

export type WordleDifficulty = "easy" | "medium" | "hard" | "progressive";

// Thematic words that align with the unkn tactile/tech/cartography brand
const THEMATIC_ADDITIONS: string[] = [
  "ASYNC", "INBOX", "PLUTO", "VENUS", "BYTES", "ATOLL", "FJORD", "GLYPH", "PIXEL",
];

// Clean, validate and normalize all 5,757+ words
const RAW_WORDS: string[] = (wordsData.words || [])
  .map((w: string) => (typeof w === "string" ? w.trim().toUpperCase() : ""))
  .filter((w: string) => w.length === 5 && /^[A-Z]{5}$/.test(w));

// Complete dictionary of all allowed words in O(1) hash set (every word can always be guessed)
export const VALID_GUESS_SET: Set<string> = new Set([
  ...RAW_WORDS,
  ...THEMATIC_ADDITIONS,
]);

// =========================================================================
// DIFFICULTY TIERS (Ranked by frequency from common to obscure)
// =========================================================================

// Easy / Casual: Top 1,200 common, everyday words (ideal for relaxing play)
export const EASY_WORDS: string[] = [
  ...RAW_WORDS.slice(0, 1200),
  ...THEMATIC_ADDITIONS,
];

// Medium / Standard: Top 2,800 common and recognizable words (classic Wordle caliber)
export const MEDIUM_WORDS: string[] = [
  ...RAW_WORDS.slice(0, 2800),
  ...THEMATIC_ADDITIONS,
];

// Hard / Expert: Full 5,757+ dictionary including archaic, literary, and rare vocabulary
export const HARD_WORDS: string[] = [
  ...RAW_WORDS,
  ...THEMATIC_ADDITIONS,
];

// Progressive 5-Round Series Curve: Each round ramps up in lexical challenge
export const PROGRESSIVE_ROUND_POOLS: Record<number, string[]> = {
  1: [...RAW_WORDS.slice(0, 900), ...THEMATIC_ADDITIONS], // Round 1: Familiar Everyday (Top 900)
  2: [...RAW_WORDS.slice(0, 1600), ...THEMATIC_ADDITIONS], // Round 2: Standard Common (Top 1,600)
  3: [...RAW_WORDS.slice(0, 2600), ...THEMATIC_ADDITIONS], // Round 3: Intermediate (Top 2,600)
  4: [...RAW_WORDS.slice(0, 3800), ...THEMATIC_ADDITIONS], // Round 4: Challenging (Top 3,800)
  5: [...RAW_WORDS, ...THEMATIC_ADDITIONS], // Round 5: Climax Master (Full 5,757 words)
};

/**
 * Checks whether an entered guess is a legitimate 5-letter English word.
 * Runs in O(1) time (< 0.001 ms).
 */
export function isValidWord(guess: string): boolean {
  if (!guess || guess.length !== 5) return false;
  return VALID_GUESS_SET.has(guess.trim().toUpperCase());
}

/**
 * Fast O(1) random solution generator tailored to difficulty preference.
 * Avoids recently played words so the user never gets repeat solutions in consecutive rounds.
 */
export function getRandomTargetWord(
  recentWords: string[] = [],
  difficulty: WordleDifficulty = "progressive",
  roundNumber: number = 1
): string {
  let candidateWords: string[];

  if (difficulty === "progressive") {
    candidateWords = PROGRESSIVE_ROUND_POOLS[roundNumber] || MEDIUM_WORDS;
  } else if (difficulty === "easy") {
    candidateWords = EASY_WORDS;
  } else if (difficulty === "medium") {
    candidateWords = MEDIUM_WORDS;
  } else {
    candidateWords = HARD_WORDS;
  }

  const recentSet = new Set(recentWords.map((w) => w.toUpperCase()));
  const pool = candidateWords.filter((w) => !recentSet.has(w));
  const candidatePool = pool.length > 30 ? pool : candidateWords;
  const index = Math.floor(Math.random() * candidatePool.length);
  return candidatePool[index];
}

/**
 * Returns today's UTC date key (YYYY-MM-DD) so everyone worldwide gets the same Daily Word.
 */
export function getTodayDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Deterministic Daily Word selector shared between Web (xweet.in) and Flutter (xweet_games).
 * Uses the top 1,500 words from words.json and a 32-bit polynomial hash of UTC YYYY-MM-DD.
 */
export function getDailyTargetWord(dateKey: string = getTodayDateKey()): string {
  const pool = RAW_WORDS.slice(0, Math.min(1500, RAW_WORDS.length));
  if (pool.length === 0) return "PLANT";
  let hash = 5381;
  for (let i = 0; i < dateKey.length; i++) {
    hash = ((hash * 33) + dateKey.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}

const RECENT_WORDS_STORAGE_KEY = "wordle_recent_words";
const DIFFICULTY_STORAGE_KEY = "wordle_difficulty_preference";
const MAX_RECENT_HISTORY = 50;

/**
 * Retrieves the user's saved difficulty preference from localStorage.
 */
export function getDifficultyPreference(): WordleDifficulty {
  if (typeof window === "undefined") return "progressive";
  try {
    const saved = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
    if (saved === "easy" || saved === "medium" || saved === "hard" || saved === "progressive") {
      return saved;
    }
  } catch {}
  return "progressive";
}

/**
 * Persists the user's difficulty preference to localStorage.
 */
export function setDifficultyPreference(difficulty: WordleDifficulty): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficulty);
  } catch {}
}

/**
 * Retrieves the list of recently played target words from localStorage.
 */
export function getRecentWords(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_WORDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Records a played word in localStorage to avoid repeats in upcoming rounds.
 */
export function recordRecentWord(word: string): void {
  if (typeof window === "undefined" || !word) return;
  try {
    const current = getRecentWords();
    const updated = [word.toUpperCase(), ...current.filter((w) => w !== word.toUpperCase())].slice(
      0,
      MAX_RECENT_HISTORY
    );
    localStorage.setItem(RECENT_WORDS_STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}
