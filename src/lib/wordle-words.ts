import wordsData from "../../public/words.json";

// Thematic words that align with the unkn tactile/tech/cartography brand
const THEMATIC_ADDITIONS: string[] = [
  "ASYNC", "INBOX", "PLUTO", "VENUS", "BYTES", "ATOLL", "FJORD", "GLYPH", "PIXEL",
];

// Clean, validate and normalize all 5,757+ words
const RAW_WORDS: string[] = (wordsData.words || [])
  .map((w: string) => (typeof w === "string" ? w.trim().toUpperCase() : ""))
  .filter((w: string) => w.length === 5 && /^[A-Z]{5}$/.test(w));

// Complete dictionary of all allowed words in O(1) hash set
export const VALID_GUESS_SET: Set<string> = new Set([
  ...RAW_WORDS,
  ...THEMATIC_ADDITIONS,
]);

// All words in the dataset can be targets
export const TARGET_WORDS: string[] = [
  ...RAW_WORDS,
  ...THEMATIC_ADDITIONS,
];

/**
 * Checks whether an entered guess is a legitimate 5-letter English word.
 * Runs in O(1) time (< 0.001 ms).
 */
export function isValidWord(guess: string): boolean {
  if (!guess || guess.length !== 5) return false;
  return VALID_GUESS_SET.has(guess.trim().toUpperCase());
}

/**
 * Fast O(1) random solution generator.
 * Avoids recently played words so the user never gets repeat solutions in consecutive rounds.
 */
export function getRandomTargetWord(recentWords: string[] = []): string {
  const recentSet = new Set(recentWords.map((w) => w.toUpperCase()));
  const pool = TARGET_WORDS.filter((w) => !recentSet.has(w));
  const candidatePool = pool.length > 50 ? pool : TARGET_WORDS;
  const index = Math.floor(Math.random() * candidatePool.length);
  return candidatePool[index];
}

const RECENT_WORDS_STORAGE_KEY = "wordle_recent_words";
const MAX_RECENT_HISTORY = 50;

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
