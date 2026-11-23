const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// database.sqlite නමින් file එකක් ස්වයංක්‍රීයව backend folder එක තුළ හැදෙනු ඇත
const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite Database successfully!');
  }
});

// Tables නිර්මාණය කිරීම (Courses සහ Boardings සඳහා)
db.serialize(() => {
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
});

module.exports = db;