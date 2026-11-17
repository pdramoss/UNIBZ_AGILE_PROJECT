import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dataDir = path.resolve("data");
fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, "outerheaven.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK(role IN ('student','admin')),
  programme TEXT DEFAULT '',
  campus TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS accommodation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  source_note TEXT NOT NULL DEFAULT 'Demo listing — verify availability and price independently'
);
`);

export default db;
