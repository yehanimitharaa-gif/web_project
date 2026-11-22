const db = require("./database");

const ugcCourses = [
  // 1. Physical Science - Computer Science (UoC)
  {
    code: "UOC-CS",
    name: "BSc in Computer Science (Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Physical Science",
    faculty: "University of Colombo School of Computing (UCSC)",
    duration: "3 / 4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 120,
    districtCutoffs: JSON.stringify({
      Colombo: 1.65,
      Gampaha: 1.685,
      Kalutara: 1.69,
      Kandy: 1.71,
      Galle: 1.705,
      Matara: 1.715,
      Kurunegala: 1.695,
    }),
    overview:
      "Offered by UCSC, this premier degree builds strong theoretical and practical expertise in software engineering, algorithms, artificial intelligence, and data science.",
    yearContent: JSON.stringify([
      {
        year: "Year 1",
        subjects: [
          "Programming & Problem Solving",
          "Data Structures & Algorithms",
          "Discrete Mathematics",
          "Computer Systems",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Object-Oriented Programming",
          "Database Management Systems",
          "Operating Systems",
          "Software Engineering",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Artificial Intelligence",
          "Computer Networks",
          "Information Security",
          "Group Software Project",
        ],
      },
      {
        year: "Year 4 (Hons)",
        subjects: [
          "Machine Learning",
          "Cloud & Distributed Computing",
          "Individual Research Thesis",
          "Industrial Internship",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 130,000 - 300,000+ per month",
      topRoles: [
        "Software Engineer",
        "Data Scientist",
        "AI/ML Engineer",
        "Full Stack Developer",
        "Systems Architect",
      ],
      topEmployers: [
        "WSO2",
        "Sysco LABS",
        "IFS",
        "LSEG Technology",
        "Global Tech Companies",
      ],
    }),
  },

  // 2. Physical Science - Engineering (UoM)
  {
    code: "UOM-ENG",
    name: "BSc Engineering (Hons)",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Physical Science",
    faculty: "Faculty of Engineering",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 850,
    districtCutoffs: JSON.stringify({
      Colombo: 1.85,
      Gampaha: 1.88,
      Kalutara: 1.9,
      Kandy: 1.92,
      Galle: 1.915,
      Matara: 1.93,
      Kurunegala: 1.895,
      Jaffna: 1.91,
    }),
    overview:
      "Sri Lanka's flagship engineering degree offering specializations in Computer Science & Engineering, Electronic & Telecommunication, Civil, Mechanical, and Electrical Engineering.",
    yearContent: JSON.stringify([
      {
        year: "Year 1",
        subjects: [
          "Engineering Mathematics",
          "Mechanics & Thermodynamics",
          "Principles of Electricity",
          "Programming Fundamentals",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Specialized Core Modules",
          "Circuit Design / Structural Analysis",
          "Numerical Methods",
          "Engineering Management",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Advanced Discipline Electives",
          "Control Systems / Data Engineering",
          "6-Month Industrial Training",
        ],
      },
      {
        year: "Year 4",
        subjects: [
          "Comprehensive Design Project",
          "Research Dissertation",
          "Professional Ethics & Innovation",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 140,000 - 350,000+ per month",
      topRoles: [
        "Software Engineer",
        "Electronics Engineer",
        "Civil Engineer",
        "Telecommunication Engineer",
        "Project Manager",
      ],
      topEmployers: [
        "Dialog Axiata",
        "CEB",
        "WSO2",
        "LSEG",
        "International Engineering Firms",
      ],
    }),
  },

  // 3. Biological Science - Medicine (UoC)
  {
    code: "UOC-MED",
    name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Biological Science",
    faculty: "Faculty of Medicine",
    duration: "5 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 205,
    districtCutoffs: JSON.stringify({
      Colombo: 2.02,
      Gampaha: 2.05,
      Kalutara: 2.06,
      Kandy: 2.08,
      Galle: 2.075,
      Matara: 2.085,
      Kurunegala: 2.065,
    }),
    overview:
      "One of South Asia's oldest and most prestigious medical degrees, preparing students for clinical practice, surgery, and medical research through hands-on hospital training.",
    yearContent: JSON.stringify([
      {
        year: "Year 1 - 2 (Pre-Clinical)",
        subjects: [
          "Human Anatomy",
          "Physiology",
          "Biochemistry",
          "Community Medicine",
        ],
      },
      {
        year: "Year 3 - 4 (Para-Clinical)",
        subjects: [
          "Pathology",
          "Pharmacology",
          "Microbiology",
          "Forensic Medicine & Parasitology",
        ],
      },
      {
        year: "Year 5 (Final Clinical)",
        subjects: [
          "Clinical Medicine",
          "Surgery",
          "Pediatrics",
          "Obstetrics & Gynecology",
          "Psychiatry",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary:
        "Government Medical Officer Scale + Allowances (High Global Mobility)",
      topRoles: [
        "Medical Officer",
        "Consultant Surgeon / Physician",
        "Medical Researcher",
        "Public Health Specialist",
      ],
      topEmployers: [
        "Ministry of Health Sri Lanka",
        "Private Hospital Chains",
        "NHS (UK) & International Healthcare Systems",
      ],
    }),
  },

  // 4. Biological Science - Agriculture / Food Science (University of Peradeniya)
  {
    code: "UOP-FST",
    name: "BSc in Food Science & Technology (Hons)",
    university: "University of Peradeniya",
    shortName: "UoP",
    stream: "Biological Science",
    faculty: "Faculty of Agriculture",
    duration: "4 Years",
    medium: "English",
    jobDemand: "High",
    intake: 65,
    districtCutoffs: JSON.stringify({
      Colombo: 1.32,
      Gampaha: 1.35,
      Kandy: 1.38,
      Kurunegala: 1.36,
      Galle: 1.37,
    }),
    overview:
      "Focuses on food chemistry, microbiology, quality assurance, food processing technologies, and nutrition to support modern food manufacturing industries.",
    yearContent: JSON.stringify([
      {
        year: "Year 1",
        subjects: [
          "Food Chemistry",
          "General Microbiology",
          "Biochemistry",
          "Principles of Nutrition",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Food Processing & Preservation",
          "Food Microbiology",
          "Food Engineering",
          "Sensory Evaluation",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Quality Assurance & ISO Standards",
          "Dairy & Meat Technology",
          "Food Packaging",
        ],
      },
      {
        year: "Year 4",
        subjects: [
          "Product Development Project",
          "Industrial Internship",
          "Research Thesis",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 85,000 - 180,000 per month",
      topRoles: [
        "Quality Assurance Manager",
        "Food Technologist",
        "R&D Specialist",
        "Production Manager",
      ],
      topEmployers: [
        "Nestlé",
        "Unilever",
        "Fonterra",
        "Cargills",
        "CBL (Munchee)",
      ],
    }),
  },

  // 5. Commerce - Business Administration (USJ)
  {
    code: "USJ-BBA",
    name: "BSc in Business Administration (Special)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Commerce",
    faculty: "Faculty of Management Studies & Commerce",
    duration: "4 Years",
    medium: "English / Sinhala",
    jobDemand: "High",
    intake: 320,
    districtCutoffs: JSON.stringify({
      Colombo: 1.48,
      Gampaha: 1.51,
      Kalutara: 1.5,
      Kandy: 1.53,
      Galle: 1.52,
      Kurunegala: 1.515,
    }),
    overview:
      "The leading management degree in Sri Lanka, equipping students with strategic leadership, financial analysis, marketing, and organizational management skills.",
    yearContent: JSON.stringify([
      {
        year: "Year 1",
        subjects: [
          "Principles of Management",
          "Financial Accounting",
          "Micro & Macro Economics",
          "Business Mathematics",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Marketing Management",
          "Human Resource Management",
          "Management Accounting",
          "Business Law",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Operations Management",
          "Corporate Finance",
          "Business Analytics",
          "Entrepreneurship",
        ],
      },
      {
        year: "Year 4",
        subjects: [
          "Strategic Management",
          "Corporate Internship",
          "Independent Research Dissertation",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 90,000 - 220,000 per month",
      topRoles: [
        "Management Trainee",
        "Business Analyst",
        "Financial Controller",
        "Brand Manager",
        "HR Business Partner",
      ],
      topEmployers: [
        "John Keells Holdings",
        "MAS Holdings",
        "Commercial Bank",
        "HNB",
        "Deloitte / EY / KPMG",
      ],
    }),
  },

  // 6. Technology - BICT (University of Sri Jayewardenepura)
  {
    code: "USJ-BICT",
    name: "Bachelor of Information and Communication Technology (BICT Hons)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Technology",
    faculty: "Faculty of Technology",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 150,
    districtCutoffs: JSON.stringify({
      Colombo: 1.55,
      Gampaha: 1.58,
      Kalutara: 1.57,
      Kandy: 1.6,
      Galle: 1.59,
      Kurunegala: 1.585,
      Matara: 1.61,
    }),
    overview:
      "Designed specifically for the Engineering/Bio Technology stream, focusing on software development, network engineering, multimedia systems, and emerging IT technologies.",
    yearContent: JSON.stringify([
      {
        year: "Year 1",
        subjects: [
          "Fundamentals of Programming",
          "Computer Architecture",
          "Web Technologies",
          "Mathematics for ICT",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Object-Oriented Programming",
          "Database Systems",
          "Data Structures & Algorithms",
          "Computer Networks",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Software Engineering",
          "Mobile Application Development",
          "Cloud Infrastructure",
          "Cybersecurity",
        ],
      },
      {
        year: "Year 4",
        subjects: [
          "6-Month Industrial Placement",
          "Final Year Software/Research Project",
          "IT Project Management",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 110,000 - 260,000 per month",
      topRoles: [
        "Software Developer",
        "Network & Cloud Engineer",
        "DevOps Engineer",
        "UI/UX Engineer",
        "QA Automation Engineer",
      ],
      topEmployers: ["WSO2", "Virtusa", "99x", "IFS", "Dialog Axiata"],
    }),
  },

  // 7. Arts - Law (University of Colombo)
  {
    code: "UOC-LAW",
    name: "Bachelor of Laws (LLB Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Arts",
    faculty: "Faculty of Law",
    duration: "4 Years",
    medium: "English / Sinhala / Tamil",
    jobDemand: "High",
    intake: 250,
    districtCutoffs: JSON.stringify({
      Colombo: 1.68,
      Gampaha: 1.71,
      Kandy: 1.73,
      Galle: 1.72,
      Kurunegala: 1.715,
    }),
    overview:
      "Sri Lanka's premier academic law program covering constitutional law, criminal law, commercial law, human rights, and international legal frameworks.",
    yearContent: JSON.stringify([
      {
        year: "Year 1",
        subjects: [
          "Constitutional Law",
          "Criminal Law",
          "Legal Systems & Legal Method",
          "Roman Law",
        ],
      },
      {
        year: "Year 2",
        subjects: [
          "Law of Contract",
          "Law of Delict (Tort)",
          "Land Law",
          "Family Law",
        ],
      },
      {
        year: "Year 3",
        subjects: [
          "Commercial & Company Law",
          "Administrative Law",
          "Public International Law",
          "Equity & Trusts",
        ],
      },
      {
        year: "Year 4",
        subjects: [
          "Jurisprudence",
          "Human Rights Law",
          "Intellectual Property Law",
          "Research Dissertation",
        ],
      },
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary:
        "Varies widely (Corporate Counsel: LKR 120,000 - 300,000+)",
      topRoles: [
        "Attorney-at-Law",
        "Corporate Legal Counsel",
        "Legal Researcher",
        "Compliance Officer",
        "State Counsel",
      ],
      topEmployers: [
        "Leading Law Firms",
        "Corporate Legal Departments",
        "Attorney General's Department",
        "International NGOs",
      ],
    }),
  },
];

const universitiesList = [
  { name: "University of Colombo", shortname: "UOC" },
  { name: "University of Peradeniya", shortname: "UOP" },
  { name: "University of Sri Jayewardenepura", shortname: "USJ" },
  { name: "University of Kelaniya", shortname: "UOK" },
  { name: "University of Moratuwa", shortname: "UOM" },
  { name: "University of Jaffna", shortname: "UOJ" },
  { name: "University of Ruhuna", shortname: "UOR" },
  { name: "South Eastern University of Sri Lanka", shortname: "SEUSL" },
  { name: "Rajarata University of Sri Lanka", shortname: "RUSL" },
  { name: "Sabaragamuwa University of Sri Lanka", shortname: "SUSL" },
  { name: "Wayamba University of Sri Lanka", shortname: "WUSL" },
  { name: "Uva Wellassa University", shortname: "UWU" },
  { name: "University of Vavuniya", shortname: "UOV" },
];

const highestIntakes = [
  {
    courseId: 15,
    uniId: 1,
    year: "2024/25",
    intake: 420,
    stream: "Physical Science",
  },
  {
    courseId: 15,
    uniId: 1,
    year: "2025/26",
    intake: 438,
    stream: "Physical Science",
  },

  {
    courseId: 15,
    uniId: 3,
    year: "2024/25",
    intake: 380,
    stream: "Biological Science",
  },
  {
    courseId: 15,
    uniId: 3,
    year: "2025/26",
    intake: 402,
    stream: "Biological Science",
  },

  { courseId: 16, uniId: 5, year: "2024/25", intake: 510, stream: "Commerce" },
  { courseId: 16, uniId: 5, year: "2025/26", intake: 526, stream: "Commerce" },

  { courseId: 16, uniId: 8, year: "2024/25", intake: 350, stream: "Arts" },
  { courseId: 16, uniId: 8, year: "2025/26", intake: 372, stream: "Arts" },

  {
    courseId: 17,
    uniId: 10,
    year: "2024/25",
    intake: 460,
    stream: "Technology",
  },
  {
    courseId: 17,
    uniId: 10,
    year: "2025/26",
    intake: 477,
    stream: "Technology",
  },

  {
    courseId: 18,
    uniId: 12,
    year: "2024/25",
    intake: 540,
    stream: "Physical Science",
  },
  {
    courseId: 18,
    uniId: 12,
    year: "2025/26",
    intake: 565,
    stream: "Physical Science",
  },

  {
    courseId: 19,
    uniId: 14,
    year: "2024/25",
    intake: 390,
    stream: "Biological Science",
  },
  {
    courseId: 19,
    uniId: 14,
    year: "2025/26",
    intake: 408,
    stream: "Biological Science",
  },

  { courseId: 20, uniId: 16, year: "2024/25", intake: 480, stream: "Commerce" },
  { courseId: 20, uniId: 16, year: "2025/26", intake: 501, stream: "Commerce" },

  { courseId: 21, uniId: 18, year: "2024/25", intake: 320, stream: "Arts" },
  { courseId: 21, uniId: 18, year: "2025/26", intake: 337, stream: "Arts" },

  {
    courseId: 21,
    uniId: 21,
    year: "2024/25",
    intake: 570,
    stream: "Technology",
  },
  {
    courseId: 21,
    uniId: 21,
    year: "2025/26",
    intake: 592,
    stream: "Technology",
  },
];

const highestApplications = [
  {
    courseId: 15,
    uniId: 1,
    year: "2024/25",
    applications: 3200,
    stream: "Physical Science",
  },
  {
    courseId: 15,
    uniId: 1,
    year: "2025/26",
    applications: 3222,
    stream: "Physical Science",
  },

  {
    courseId: 15,
    uniId: 3,
    year: "2024/25",
    applications: 4500,
    stream: "Biological Science",
  },
  {
    courseId: 15,
    uniId: 3,
    year: "2025/26",
    applications: 4520,
    stream: "Biological Science",
  },

  {
    courseId: 16,
    uniId: 5,
    year: "2024/25",
    applications: 2800,
    stream: "Commerce",
  },
  {
    courseId: 16,
    uniId: 5,
    year: "2025/26",
    applications: 2818,
    stream: "Commerce",
  },

  {
    courseId: 16,
    uniId: 8,
    year: "2024/25",
    applications: 1900,
    stream: "Arts",
  },
  {
    courseId: 16,
    uniId: 8,
    year: "2025/26",
    applications: 1925,
    stream: "Arts",
  },

  {
    courseId: 17,
    uniId: 10,
    year: "2024/25",
    applications: 3800,
    stream: "Technology",
  },
  {
    courseId: 17,
    uniId: 10,
    year: "2025/26",
    applications: 3816,
    stream: "Technology",
  },

  {
    courseId: 18,
    uniId: 12,
    year: "2024/25",
    applications: 5200,
    stream: "Physical Science",
  },
  {
    courseId: 18,
    uniId: 12,
    year: "2025/26",
    applications: 5224,
    stream: "Physical Science",
  },

  {
    courseId: 19,
    uniId: 14,
    year: "2024/25",
    applications: 2400,
    stream: "Biological Science",
  },
  {
    courseId: 19,
    uniId: 14,
    year: "2025/26",
    applications: 2419,
    stream: "Biological Science",
  },

  {
    courseId: 20,
    uniId: 16,
    year: "2024/25",
    applications: 4100,
    stream: "Commerce",
  },
  {
    courseId: 20,
    uniId: 16,
    year: "2025/26",
    applications: 4127,
    stream: "Commerce",
  },

  {
    courseId: 21,
    uniId: 18,
    year: "2024/25",
    applications: 1500,
    stream: "Arts",
  },
  {
    courseId: 21,
    uniId: 18,
    year: "2025/26",
    applications: 1517,
    stream: "Arts",
  },

  {
    courseId: 21,
    uniId: 21,
    year: "2024/25",
    applications: 4800,
    stream: "Technology",
  },
  {
    courseId: 21,
    uniId: 21,
    year: "2025/26",
    applications: 4828,
    stream: "Technology",
  },
];

const highestCuttoff = [
  {
    courseId: 15,
    uniId: 1,
    year: "2024/25",
    cutoff: 2.845,
    stream: "Physical Science",
  },
  {
    courseId: 15,
    uniId: 1,
    year: "2025/26",
    cutoff: 2.861,
    stream: "Physical Science",
  },

  {
    courseId: 15,
    uniId: 3,
    year: "2024/25",
    cutoff: 3.125,
    stream: "Biological Science",
  },
  {
    courseId: 15,
    uniId: 3,
    year: "2025/26",
    cutoff: 3.148,
    stream: "Biological Science",
  },

  {
    courseId: 16,
    uniId: 5,
    year: "2024/25",
    cutoff: 2.675,
    stream: "Commerce",
  },
  {
    courseId: 16,
    uniId: 5,
    year: "2025/26",
    cutoff: 2.692,
    stream: "Commerce",
  },

  { courseId: 16, uniId: 8, year: "2024/25", cutoff: 2.35, stream: "Arts" },
  { courseId: 16, uniId: 8, year: "2025/26", cutoff: 2.371, stream: "Arts" },

  {
    courseId: 17,
    uniId: 10,
    year: "2024/25",
    cutoff: 3.245,
    stream: "Technology",
  },
  {
    courseId: 17,
    uniId: 10,
    year: "2025/26",
    cutoff: 3.267,
    stream: "Technology",
  },

  {
    courseId: 18,
    uniId: 12,
    year: "2024/25",
    cutoff: 3.52,
    stream: "Physical Science",
  },
  {
    courseId: 18,
    uniId: 12,
    year: "2025/26",
    cutoff: 3.548,
    stream: "Physical Science",
  },

  {
    courseId: 19,
    uniId: 14,
    year: "2024/25",
    cutoff: 2.985,
    stream: "Biological Science",
  },
  {
    courseId: 19,
    uniId: 14,
    year: "2025/26",
    cutoff: 3.002,
    stream: "Biological Science",
  },

  {
    courseId: 20,
    uniId: 16,
    year: "2024/25",
    cutoff: 2.725,
    stream: "Commerce",
  },
  {
    courseId: 20,
    uniId: 16,
    year: "2025/26",
    cutoff: 2.743,
    stream: "Commerce",
  },

  { courseId: 21, uniId: 18, year: "2024/25", cutoff: 2.185, stream: "Arts" },
  { courseId: 21, uniId: 18, year: "2025/26", cutoff: 2.208, stream: "Arts" },

  {
    courseId: 21,
    uniId: 21,
    year: "2024/25",
    cutoff: 3.685,
    stream: "Technology",
  },
  {
    courseId: 21,
    uniId: 21,
    year: "2025/26",
    cutoff: 3.712,
    stream: "Technology",
  },
];

console.log(
  "Seeding expanded UGC dataset, universities, and highest statistics into SQLite database...",
);

db.serialize(() => {
  db.run(`PRAGMA foreign_keys = OFF;`);

  // Ensure tables have correct schema if not already recreated
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

  // 1. Courses
  db.run(`DELETE FROM courses`, (err) => {
    if (err) console.error("Error clearing old courses:", err.message);
  });
  db.run(`UPDATE sqlite_sequence SET seq = 14 WHERE name = 'courses'`);

  const stmt = db.prepare(`
    INSERT INTO courses 
    (code, name, university, shortName, stream, faculty, duration, medium, jobDemand, intake, districtCutoffs, overview, yearContent, jobMarket) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  ugcCourses.forEach((c) => {
    stmt.run(
      c.code,
      c.name,
      c.university,
      c.shortName,
      c.stream,
      c.faculty,
      c.duration,
      c.medium,
      c.jobDemand,
      c.intake,
      c.districtCutoffs,
      c.overview,
      c.yearContent,
      c.jobMarket,
    );
  });

  stmt.finalize(() => {
    console.log(
      `✅ Successfully seeded ${ugcCourses.length} UGC degree programs across all streams!`,
    );
  });

  // 2. Universities
  db.run(`DELETE FROM universities`, (err) => {
    if (err) console.error("Error clearing old universities:", err.message);
  });
  db.run(`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'universities'`);

  const uniStmt = db.prepare(`
    INSERT INTO universities (name, shortname)
    VALUES (?, ?)
  `);

  universitiesList.forEach((u) => {
    uniStmt.run(u.name, u.shortname);
  });

  uniStmt.finalize(() => {
    console.log(
      `✅ Successfully seeded ${universitiesList.length} universities!`,
    );
  });

  // 3. Highest Intakes
  db.run(`DELETE FROM highestIntakes`, (err) => {
    if (err) console.error("Error clearing old highestIntakes:", err.message);
  });
  db.run(`DELETE FROM sqlite_sequence WHERE name = 'highestIntakes'`);

  const intakeStmt = db.prepare(`
    INSERT INTO highestIntakes (courseId, uniId, year, intake, stream)
    VALUES (?, ?, ?, ?, ?)
  `);

  highestIntakes.forEach((item) => {
    intakeStmt.run(
      item.courseId,
      item.uniId,
      item.year,
      item.intake,
      item.stream,
    );
  });

  intakeStmt.finalize(() => {
    console.log(
      `✅ Successfully seeded ${highestIntakes.length} highestIntakes records!`,
    );
  });

  // 4. Highest Applications
  db.run(`DELETE FROM highestApplications`, (err) => {
    if (err)
      console.error("Error clearing old highestApplications:", err.message);
  });
  db.run(`DELETE FROM sqlite_sequence WHERE name = 'highestApplications'`);

  const appStmt = db.prepare(`
    INSERT INTO highestApplications (courseId, uniId, year, applications, stream)
    VALUES (?, ?, ?, ?, ?)
  `);

  highestApplications.forEach((item) => {
    appStmt.run(
      item.courseId,
      item.uniId,
      item.year,
      item.applications,
      item.stream,
    );
  });

  appStmt.finalize(() => {
    console.log(
      `✅ Successfully seeded ${highestApplications.length} highestApplications records!`,
    );
  });

  // 5. Highest Cutoff
  db.run(`DELETE FROM highestCuttoff`, (err) => {
    if (err) console.error("Error clearing old highestCuttoff:", err.message);
  });
  db.run(`DELETE FROM sqlite_sequence WHERE name = 'highestCuttoff'`);

  const cutoffStmt = db.prepare(`
    INSERT INTO highestCuttoff (courseId, uniId, year, cutoff, stream)
    VALUES (?, ?, ?, ?, ?)
  `);

  highestCuttoff.forEach((item) => {
    cutoffStmt.run(
      item.courseId,
      item.uniId,
      item.year,
      item.cutoff,
      item.stream,
    );
  });

  cutoffStmt.finalize(() => {
    console.log(
      `✅ Successfully seeded ${highestCuttoff.length} highestCuttoff records!`,
    );
    process.exit(0);
  });
});
