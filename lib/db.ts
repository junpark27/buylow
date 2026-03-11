import { Pool } from "@neondatabase/serverless";

// Vercel Postgres (now Neon) env vars have "buylow_" prefix
const pool = new Pool({ connectionString: process.env.buylow_DATABASE_URL });

export async function query(text: string, values?: unknown[]) {
  const result = await pool.query(text, values);
  return result; // { rows, rowCount, ... } — compatible with @vercel/postgres
}

export const db = { query };
