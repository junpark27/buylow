import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Check if user is admin, also returns total count and (for admins) the admin list
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");

  const countResult = await db.query("SELECT COUNT(*) as count FROM admins");
  const count = parseInt(countResult.rows[0].count);

  if (!userId) return NextResponse.json({ isAdmin: false, count });

  const result = await db.query("SELECT id FROM admins WHERE user_id = $1", [userId]);
  const isAdmin = result.rows.length > 0;

  if (isAdmin) {
    const allAdmins = await db.query(
      "SELECT id, user_id, created_at FROM admins ORDER BY created_at ASC"
    );
    return NextResponse.json({ isAdmin: true, count, admins: allAdmins.rows });
  }

  return NextResponse.json({ isAdmin: false, count });
}

// Add admin (only works if no admins exist yet, or caller is admin)
export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  // Check if any admins exist
  const existing = await db.query("SELECT COUNT(*) as count FROM admins");
  const count = parseInt(existing.rows[0].count);

  if (count === 0) {
    // First admin — allow without auth
    await db.query("INSERT INTO admins (user_id) VALUES ($1) ON CONFLICT DO NOTHING", [userId]);
    return NextResponse.json({ success: true, message: "First admin registered" });
  }

  // Otherwise, caller must be admin
  const callerId = req.headers.get("x-user-id");
  if (!callerId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const callerAdmin = await db.query("SELECT id FROM admins WHERE user_id = $1", [callerId]);
  if (callerAdmin.rows.length === 0) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.query("INSERT INTO admins (user_id) VALUES ($1) ON CONFLICT DO NOTHING", [userId]);
  return NextResponse.json({ success: true });
}
