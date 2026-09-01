-- SQLite Database Schema for SMARA

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  preferred_language TEXT DEFAULT 'Hindi',
  secondary_language TEXT DEFAULT 'English',
  code_mixing TEXT DEFAULT 'Medium',
  favorite_music TEXT,
  favorite_food TEXT,
  favorite_places TEXT, -- JSON array of strings
  hobbies TEXT, -- JSON array of strings
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Family Members Table
CREATE TABLE IF NOT EXISTS family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  photo_url TEXT, -- Path to uploaded photo
  voice_url TEXT, -- Path to uploaded audio
  description TEXT, -- Short description/hint
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Memories Table
CREATE TABLE IF NOT EXISTS memories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Family', -- Events, Family, Places, People
  description TEXT,
  image_url TEXT,
  people TEXT, -- JSON array of names
  date TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Timeline Events Table
CREATE TABLE IF NOT EXISTS timeline_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Activity Sessions Table (for game tracking)
CREATE TABLE IF NOT EXISTS activity_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  game_id TEXT NOT NULL, -- e.g., 'who-is-this', 'guess-the-voice', etc.
  score INTEGER DEFAULT 0,
  total_rounds INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT 1,
  session_data TEXT, -- JSON for game-specific data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL UNIQUE,
  language TEXT DEFAULT 'Hindi',
  font_size TEXT DEFAULT 'normal',
  high_contrast BOOLEAN DEFAULT 0,
  notifications BOOLEAN DEFAULT 1,
  sound BOOLEAN DEFAULT 1,
  reduce_animation BOOLEAN DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- Stats Table
CREATE TABLE IF NOT EXISTS stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL UNIQUE,
  activities_completed INTEGER DEFAULT 0,
  memory_interactions INTEGER DEFAULT 0,
  engagement_time INTEGER DEFAULT 0, -- in minutes
  familiarity_score INTEGER DEFAULT 0, -- percentage (0-100)
  last_activity TEXT, -- JSON of recent activities
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);
