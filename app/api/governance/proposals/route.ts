import { type NextRequest, NextResponse } from "next/server"
import { initDatabase, getDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    await initDatabase()
    const db = getDatabase()

    const proposals = db.prepare(`
      SELECT 
        p.*,
        u.username as proposed_by_name
      FROM proposals p
      JOIN users u ON p.proposed_by = u.id
      WHERE p.community_id = 1 AND p.status = 'active'
      ORDER BY p.created_at DESC
    `).all()

    return NextResponse.json(proposals)
  } catch (error) {
    console.error("Proposals fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
