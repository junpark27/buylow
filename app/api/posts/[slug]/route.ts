import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Get single post
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const result = await db.query("SELECT * FROM posts WHERE slug = $1", [slug]);

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// Update post (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminCheck = await db.query("SELECT id FROM admins WHERE user_id = $1", [userId]);
  if (adminCheck.rows.length === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { title, description, content, tags, published } = await req.json();

  const result = await db.query(
    `UPDATE posts SET title = $1, description = $2, content = $3, tags = $4, published = $5, updated_at = NOW()
     WHERE slug = $6 RETURNING *`,
    [title, description, content, tags, published, slug]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

// Delete post (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const userId = req.headers.get("x-user-id");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const adminCheck = await db.query("SELECT id FROM admins WHERE user_id = $1", [userId]);
  if (adminCheck.rows.length === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await db.query("DELETE FROM posts WHERE slug = $1", [slug]);
  return NextResponse.json({ success: true });
}
