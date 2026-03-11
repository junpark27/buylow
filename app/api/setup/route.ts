import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Check env var exists
    const dbUrl = process.env.buylow_DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json(
        { error: "buylow_DATABASE_URL not set" },
        { status: 500 }
      );
    }

    // Dynamic import to catch module-level errors
    const { db } = await import("@/lib/db");

    // Create admins table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        user_id TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create posts table
    await db.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT DEFAULT '',
        content TEXT DEFAULT '',
        tags TEXT[] DEFAULT ARRAY[]::TEXT[],
        published BOOLEAN DEFAULT false,
        author_id TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message + " | " + error.stack
        : typeof error === "string"
          ? error
          : JSON.stringify(error, Object.getOwnPropertyNames(error as object));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
