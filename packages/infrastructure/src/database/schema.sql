-- Project Atlas database schema.
-- Mirrors docs/05-Database-Design.md sections 3, 4, and 6 exactly.
-- Do not edit table shapes here without updating that doc first.

CREATE TABLE IF NOT EXISTS categories (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL UNIQUE,
  color TEXT
);

CREATE TABLE IF NOT EXISTS leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  business_name TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  website       TEXT,
  address       TEXT,
  city          TEXT,
  country       TEXT,
  source        TEXT NOT NULL CHECK (source IN ('google_maps', 'google_search', 'company_website')),
  category_id   INTEGER REFERENCES categories(id),
  score         INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  priority      TEXT NOT NULL CHECK (priority IN ('Green', 'Yellow', 'Red')),
  notes         TEXT,
  imported_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  lead_id      INTEGER NOT NULL UNIQUE REFERENCES leads(id),
  project_name TEXT NOT NULL,
  client_name  TEXT,
  budget       REAL,
  status       TEXT NOT NULL CHECK (status IN ('Active', 'Completed', 'Cancelled')),
  start_date   DATE,
  end_date     DATE,
  notes        TEXT
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  action     TEXT NOT NULL,
  details    TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  theme             TEXT DEFAULT 'Light',
  export_folder     TEXT,
  default_category  TEXT,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- docs/05-Database-Design.md section 6: Indexes
CREATE INDEX IF NOT EXISTS idx_leads_business_name ON leads(business_name);
CREATE INDEX IF NOT EXISTS idx_leads_phone         ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email         ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_website        ON leads(website);
CREATE INDEX IF NOT EXISTS idx_leads_score          ON leads(score);
CREATE INDEX IF NOT EXISTS idx_leads_category_id    ON leads(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status       ON projects(status);
