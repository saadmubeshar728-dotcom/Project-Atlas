import Database from "better-sqlite3";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Opens (and, on first run, initializes) the Atlas SQLite database.
 *
 * Uses better-sqlite3 rather than the async node-sqlite3 binding - it's
 * synchronous, faster for this access pattern, and avoids the native-module
 * rebuild headaches that async sqlite bindings commonly hit under Electron.
 *
 * @param dbPath Absolute path to atlas.db. In the Electron app this should
 *   be `app.getPath("userData") + "/atlas.db"`, kept out of this package so
 *   @atlas/infrastructure has no dependency on Electron itself.
 */
export function createDatabaseClient(dbPath: string): Database.Database {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");
  db.exec(schema);

  return db;
}

export type { Database as DatabaseClient } from "better-sqlite3";
