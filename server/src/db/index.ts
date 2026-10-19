import "dotenv/config";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";

const databasePath = resolve(process.env.DATABASE_URL ?? "./data/outfit-recommender.sqlite");
mkdirSync(dirname(databasePath), { recursive: true });

export const sqlite = new Database(databasePath);
sqlite.exec("PRAGMA foreign_keys = ON");
export const db = drizzle({ client: sqlite, schema });
