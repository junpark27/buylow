import { createClient } from "@vercel/postgres";

// Vercel Postgres store env vars have "buylow_" prefix
// createClient supports both direct and pooled connection strings
export function getDb() {
  return createClient({
    connectionString: process.env.buylow_POSTGRES_URL,
  });
}

// Helper to run a single query (opens/closes connection automatically)
export async function query(text: string, values?: unknown[]) {
  const client = getDb();
  await client.connect();
  try {
    return await client.query(text, values);
  } finally {
    await client.end();
  }
}

// Export a db-like object with a query method for compatibility
export const db = { query };
