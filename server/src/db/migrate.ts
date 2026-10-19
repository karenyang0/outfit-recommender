import "dotenv/config";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";

const databasePath = resolve(process.env.DATABASE_URL ?? "./data/outfit-recommender.sqlite");
mkdirSync(dirname(databasePath), { recursive: true });
const sqlite = new Database(databasePath);
sqlite.exec("PRAGMA foreign_keys = ON");
migrate(drizzle({ client: sqlite }), { migrationsFolder: "./drizzle" });
sqlite.close();
console.info(`Database migrated: ${databasePath}`);
