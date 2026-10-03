CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  reg TEXT NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  percentage REAL NOT NULL,
  wrong INTEGER NOT NULL,
  unanswered INTEGER NOT NULL,
  status TEXT NOT NULL,
  auto_submitted INTEGER NOT NULL DEFAULT 0,
  submitted_at TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_results_reg ON results(reg);
CREATE INDEX IF NOT EXISTS idx_results_subject ON results(subject);
CREATE INDEX IF NOT EXISTS idx_results_submitted_at ON results(submitted_at);