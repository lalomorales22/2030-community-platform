import { type NextRequest, NextResponse } from "next/server"
import { initDatabase, getDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    await initDatabase()
    const db = getDatabase()

    const energyData = db.prepare(`
      SELECT 
        datetime(timestamp) as time,
        solar_kwh,
        battery_stored_kwh,
        total_consumption_kwh
      FROM energy_generation 
      WHERE community_id = 1 
      ORDER BY timestamp DESC 
      LIMIT 24
    `).all()

    return NextResponse.json(energyData)
  } catch (error) {
    console.error("Energy data fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { solar_kwh, battery_stored_kwh, total_consumption_kwh } = await request.json()

    await initDatabase()
    const db = getDatabase()

    const result = db.prepare(`
      INSERT INTO energy_generation (community_id, solar_kwh, battery_stored_kwh, total_consumption_kwh)
      VALUES (1, ?, ?, ?)
    `).run(solar_kwh, battery_stored_kwh, total_consumption_kwh)

    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 })
  } catch (error) {
    console.error("Energy data creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
