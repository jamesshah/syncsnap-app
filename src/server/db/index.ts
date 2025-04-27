import { drizzle } from "drizzle-orm/singlestore";
import { env } from "~/env";
import * as schema from "./schema";
import { createPool, type Pool } from "mysql2/promise";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Pool | undefined;
};

export const client =
  globalForDb.client ??
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    database: env.SINGLESTORE_DB,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    ssl: {},
    maxIdle: 0,
  });

if (env.NODE_ENV !== "production") globalForDb.client = client;

client.addListener("error", (err) => {
  console.error("Database connection error:", err);
});

export const db = drizzle(client);
