import { NextRequest, NextResponse } from "next/server";
import { evaluateGuess } from "@/lib/server/gameSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gameId, roundIndex, selectedCountryCode } = body;

    if (!gameId || typeof roundIndex !== "number" || !selectedCountryCode) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: gameId, roundIndex, selectedCountryCode." },
        { status: 400 }
      );
    }

    const result = evaluateGuess(gameId, roundIndex, selectedCountryCode);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error evaluating guess:", error);
    return NextResponse.json(
      { success: false, error: "Failed to evaluate guess on server." },
      { status: 500 }
    );
  }
}
