import { neon } from "@neondatabase/serverless";

// Vercel Postgres (now Neon) env vars have "buylow_" prefix
let _sql: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!_sql) {
    _sql = neon(process.env.buylow_POSTGRES_URL!);
  }
  return _sql;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function query(text: string, values?: any[]) {
  const sql = getSql();
  // Use sql.query() for conventional function calls with $1 placeholders
  const rows = await (sql as any).query(text, values);
  return { rows };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const db = { query };
