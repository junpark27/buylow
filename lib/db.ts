import { Pool } from "pg";

// Vercel Postgres env vars have "buylow_" prefix
const pool = new Pool({
  connectionString: process.env.buylow_POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function query(text: string, values?: any[]) {
  const result = await pool.query(text, values);
  return result; // { rows, rowCount, ... }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const db = { query };
