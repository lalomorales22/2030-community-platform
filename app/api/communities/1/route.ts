import { type NextRequest, NextResponse } from "next/server"
import { initDatabase, getDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    await initDatabase()
    const db = getDatabase()

    const community = db.prepare("SELECT * FROM communities WHERE id = 1").get()

    if (!community) {
      return NextResponse.json({ error: "Community not found" }, { status: 404 })
    }

    return NextResponse.json(community)
  } catch (error) {
    console.error("Community fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
