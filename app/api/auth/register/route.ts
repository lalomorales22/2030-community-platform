import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { initDatabase, getDatabase } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()

    if (!email || !username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Initialize database
    await initDatabase()
    const db = getDatabase()

    // Check if user already exists
    const existingUser = db.prepare("SELECT id FROM users WHERE email = ? OR username = ?").get(email, username)

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const result = db
      .prepare(`
      INSERT INTO users (email, username, password_hash, role, created_at)
      VALUES (?, ?, ?, 'member', datetime('now'))
    `)
      .run(email, username, passwordHash)

    // Create member account
    db.prepare(`
      INSERT INTO member_accounts (user_id, balance, credit_score, created_at)
      VALUES (?, 1000.0, 500, datetime('now'))
    `).run(result.lastInsertRowid)

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: result.lastInsertRowid,
        email,
        username,
        role: "member",
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    const user = {
      id: result.lastInsertRowid,
      email,
      username,
      role: "member",
      community_id: null,
    }

    return NextResponse.json({ token, user }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
