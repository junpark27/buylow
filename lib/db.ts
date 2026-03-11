import { neon } from "@neondatabase/serverless";

// Vercel Postgres (now Neon) env vars have "buylow_" prefix
let _sql: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!_sql) {
    _sql = neon(process.env.buylow_DATABASE_URL!);
  }
  return _sql;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function query(text: string, values?: any[]) {
  const sql = getSql();
  // neon() supports regular function call: sql(query, params)
  // TypeScript types only expose tagged template, so we cast
  const fn = sql as unknown as (text: string, params?: unknown[]) => Promise<any[]>;
  const rows = await fn(text, values);
  return { rows };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const db = { query };
