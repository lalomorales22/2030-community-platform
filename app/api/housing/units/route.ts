import { type NextRequest, NextResponse } from "next/server"
import { initDatabase, getDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    await initDatabase()
    const db = getDatabase()

    const housingUnits = db.prepare(`
      SELECT 
        h.*,
        u.username as occupant_name
      FROM housing_units h
      LEFT JOIN users u ON h.occupant_id = u.id
      WHERE h.community_id = 1
      ORDER BY h.address
    `).all()

    return NextResponse.json(housingUnits)
  } catch (error) {
    console.error("Housing units fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
