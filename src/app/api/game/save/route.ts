import { NextRequest, NextResponse } from "next/server";
import { getSummary } from "@/lib/server/gameSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gameId, userId, userEmail } = body;

    if (!gameId || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing gameId or userId." },
        { status: 400 }
      );
    }

    const summary = getSummary(gameId);
    if (!summary) {
      return NextResponse.json(
        { success: false, error: "Expedition not found or session expired." },
        { status: 404 }
      );
    }

    if (summary.rounds.length < 10) {
      return NextResponse.json(
        { success: false, error: "Cannot persist incomplete expedition." },
        { status: 400 }
      );
    }

    // Return validated summary payload ready for client or server Firestore persistence
    return NextResponse.json({
      success: true,
      expedition: {
        gameId,
        userId,
        userEmail: userEmail || null,
        finalScore: summary.finalScore,
        totalRounds: summary.totalRounds,
        correctCount: summary.correctCount,
        accuracyPercentage: summary.accuracyPercentage,
        rounds: summary.rounds,
        completedAt: summary.completedAt,
      },
    });
  } catch (error) {
    console.error("Error saving expedition:", error);
    return NextResponse.json(
      { success: false, error: "Server error while saving expedition." },
      { status: 500 }
    );
  }
}
