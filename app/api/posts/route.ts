import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Get all posts (published only for non-admin, all for admin)
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  let isAdmin = false;

  if (userId) {
    const result = await db.query("SELECT id FROM admins WHERE user_id = $1", [userId]);
    isAdmin = result.rows.length > 0;
  }

  const query = isAdmin
    ? "SELECT id, slug, title, description, tags, published, created_at, updated_at FROM posts ORDER BY created_at DESC"
    : "SELECT id, slug, title, description, tags, published, created_at, updated_at FROM posts WHERE published = true ORDER BY created_at DESC";

  const result = await db.query(query);
  return NextResponse.json(result.rows);
}

// Create post (admin only)
export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminCheck = await db.query("SELECT id FROM admins WHERE user_id = $1", [userId]);
  if (adminCheck.rows.length === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, slug, description, content, tags, published } = await req.json();

  const result = await db.query(
    `INSERT INTO posts (title, slug, description, content, tags, published, author_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [title, slug, description || "", content || "", tags || [], published || false, userId]
  );

  return NextResponse.json(result.rows[0]);
}
