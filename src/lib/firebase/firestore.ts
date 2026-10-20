import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./config";

export interface CompletedExpeditionData {
  gameId: string;
  userId: string;
  userEmail?: string | null;
  finalScore: number;
  totalRounds: number;
  correctCount: number;
  accuracyPercentage: number;
  rounds: Array<{
    roundNumber: number;
    actualCountry: { name: string; code: string; flag: string };
    selectedCountry: { name: string; code: string; flag: string };
    isCorrect: boolean;
    points: number;
    coordinates?: { lat: number; lng: number };
  }>;
}

export async function saveExpeditionToFirestore(data: CompletedExpeditionData): Promise<{ success: boolean; error?: string }> {
  if (!firestore) {
    return { success: false, error: "Firestore is not configured." };
  }

  try {
    const docRef = doc(firestore, "expeditions", data.gameId);
    await setDoc(docRef, {
      ...data,
      savedAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to save expedition to Firestore:", error);
    const msg = error instanceof Error ? error.message : "Failed to persist expedition.";
    return { success: false, error: msg };
  }
}
