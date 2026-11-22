const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// database.sqlite ගොනුව root directory එකෙහි ඇති database folder එකෙන් load කරයි
const dbPath = path.resolve(__dirname, "..", "database", "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error opening SQLite database:", err.message);
  } else {
    console.log("✅ Connected to SQLite Database successfully!");
  }
});

// Tables නිර්මාණය කිරීම (Courses, Boardings, Universities, Highest Stats සඳහා)
db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON;`);

  db.run(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    name TEXT,
    university TEXT,
    shortName TEXT,
    stream TEXT,
    faculty TEXT,
    duration TEXT,
    medium TEXT,
    jobDemand TEXT,
    intake INTEGER,
    districtCutoffs TEXT,
    overview TEXT,          -- අලුතින් එකතු කළා
    yearContent TEXT,       -- අලුතින් එකතු කළා (JSON string ලෙස)
    jobMarket TEXT          -- අලුතින් එකතු කළා (JSON string ලෙස)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS boardings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    universityNear TEXT,
    price REAL,
    gender TEXT,
    contact TEXT,
    location TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS universities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    shortname TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS highestIntakes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId INTEGER,
    uniId INTEGER,
    year TEXT,
    intake INTEGER,
    stream TEXT,
    FOREIGN KEY (courseId) REFERENCES courses(id),
    FOREIGN KEY (uniId) REFERENCES universities(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS highestApplications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId INTEGER,
    uniId INTEGER,
    year TEXT,
    applications INTEGER,
    stream TEXT,
    FOREIGN KEY (courseId) REFERENCES courses(id),
    FOREIGN KEY (uniId) REFERENCES universities(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS highestCuttoff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    courseId INTEGER,
    uniId INTEGER,
    year TEXT,
    cutoff REAL,
    stream TEXT,
    FOREIGN KEY (courseId) REFERENCES courses(id),
    FOREIGN KEY (uniId) REFERENCES universities(id)
  )`);
});

module.exports = db;
