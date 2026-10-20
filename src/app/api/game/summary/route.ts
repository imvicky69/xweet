import { NextRequest, NextResponse } from "next/server";
import { getSummary } from "@/lib/server/gameSession";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gameId } = body;

    if (!gameId) {
      return NextResponse.json({ success: false, error: "Missing gameId parameter." }, { status: 400 });
    }

    const summary = getSummary(gameId);
    if (!summary) {
      return NextResponse.json({ success: false, error: "Expedition summary not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Error retrieving expedition summary:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve summary." },
      { status: 500 }
    );
  }
}
