import { NextResponse } from "next/server";
import { createGameSession } from "@/lib/server/gameSession";

export async function POST() {
  try {
    const { gameId, initialRound } = createGameSession();
    return NextResponse.json({
      success: true,
      gameId,
      initialRound,
    });
  } catch (error) {
    console.error("Error creating game session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initialize game session." },
      { status: 500 }
    );
  }
}
