import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { initDatabase, getDatabase } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

      // Initialize database
      await initDatabase()
      const db = getDatabase()

      // Get fresh user data
      const user = db
        .prepare("SELECT id, email, username, role, community_id FROM users WHERE id = ?")
        .get(decoded.userId)

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 401 })
      }

      return NextResponse.json({ user })
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
