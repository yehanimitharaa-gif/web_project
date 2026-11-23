const db = require('./database');

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
      "Colombo": 1.6500,
      "Gampaha": 1.6850,
      "Kalutara": 1.6900,
      "Kandy": 1.7100,
      "Galle": 1.7050,
      "Matara": 1.7150,
      "Kurunegala": 1.6950
    }),
    overview: "Offered by UCSC, this premier degree builds strong theoretical and practical expertise in software engineering, algorithms, artificial intelligence, and data science.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Programming & Problem Solving", "Data Structures & Algorithms", "Discrete Mathematics", "Computer Systems"] },
      { year: "Year 2", subjects: ["Object-Oriented Programming", "Database Management Systems", "Operating Systems", "Software Engineering"] },
      { year: "Year 3", subjects: ["Artificial Intelligence", "Computer Networks", "Information Security", "Group Software Project"] },
      { year: "Year 4 (Hons)", subjects: ["Machine Learning", "Cloud & Distributed Computing", "Individual Research Thesis", "Industrial Internship"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 130,000 - 300,000+ per month",
      topRoles: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Full Stack Developer", "Systems Architect"],
      topEmployers: ["WSO2", "Sysco LABS", "IFS", "LSEG Technology", "Global Tech Companies"]
    })
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
      "Colombo": 1.8500,
      "Gampaha": 1.8800,
      "Kalutara": 1.9000,
      "Kandy": 1.9200,
      "Galle": 1.9150,
      "Matara": 1.9300,
      "Kurunegala": 1.8950,
      "Jaffna": 1.9100
    }),
    overview: "Sri Lanka's flagship engineering degree offering specializations in Computer Science & Engineering, Electronic & Telecommunication, Civil, Mechanical, and Electrical Engineering.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Engineering Mathematics", "Mechanics & Thermodynamics", "Principles of Electricity", "Programming Fundamentals"] },
      { year: "Year 2", subjects: ["Specialized Core Modules", "Circuit Design / Structural Analysis", "Numerical Methods", "Engineering Management"] },
      { year: "Year 3", subjects: ["Advanced Discipline Electives", "Control Systems / Data Engineering", "6-Month Industrial Training"] },
      { year: "Year 4", subjects: ["Comprehensive Design Project", "Research Dissertation", "Professional Ethics & Innovation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 140,000 - 350,000+ per month",
      topRoles: ["Software Engineer", "Electronics Engineer", "Civil Engineer", "Telecommunication Engineer", "Project Manager"],
      topEmployers: ["Dialog Axiata", "CEB", "WSO2", "LSEG", "International Engineering Firms"]
    })
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
      "Colombo": 2.0200,
      "Gampaha": 2.0500,
      "Kalutara": 2.0600,
      "Kandy": 2.0800,
      "Galle": 2.0750,
      "Matara": 2.0850,
      "Kurunegala": 2.0650
    }),
    overview: "One of South Asia's oldest and most prestigious medical degrees, preparing students for clinical practice, surgery, and medical research through hands-on hospital training.",
    yearContent: JSON.stringify([
      { year: "Year 1 - 2 (Pre-Clinical)", subjects: ["Human Anatomy", "Physiology", "Biochemistry", "Community Medicine"] },
      { year: "Year 3 - 4 (Para-Clinical)", subjects: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine & Parasitology"] },
      { year: "Year 5 (Final Clinical)", subjects: ["Clinical Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Psychiatry"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "Government Medical Officer Scale + Allowances (High Global Mobility)",
      topRoles: ["Medical Officer", "Consultant Surgeon / Physician", "Medical Researcher", "Public Health Specialist"],
      topEmployers: ["Ministry of Health Sri Lanka", "Private Hospital Chains", "NHS (UK) & International Healthcare Systems"]
    })
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
      "Colombo": 1.3200,
      "Gampaha": 1.3500,
      "Kandy": 1.3800,
      "Kurunegala": 1.3600,
      "Galle": 1.3700
    }),
    overview: "Focuses on food chemistry, microbiology, quality assurance, food processing technologies, and nutrition to support modern food manufacturing industries.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Food Chemistry", "General Microbiology", "Biochemistry", "Principles of Nutrition"] },
      { year: "Year 2", subjects: ["Food Processing & Preservation", "Food Microbiology", "Food Engineering", "Sensory Evaluation"] },
      { year: "Year 3", subjects: ["Quality Assurance & ISO Standards", "Dairy & Meat Technology", "Food Packaging"] },
      { year: "Year 4", subjects: ["Product Development Project", "Industrial Internship", "Research Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 85,000 - 180,000 per month",
      topRoles: ["Quality Assurance Manager", "Food Technologist", "R&D Specialist", "Production Manager"],
      topEmployers: ["Nestlé", "Unilever", "Fonterra", "Cargills", "CBL (Munchee)"]
    })
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
      "Colombo": 1.4800,
      "Gampaha": 1.5100,
      "Kalutara": 1.5000,
      "Kandy": 1.5300,
      "Galle": 1.5200,
      "Kurunegala": 1.5150
    }),
    overview: "The leading management degree in Sri Lanka, equipping students with strategic leadership, financial analysis, marketing, and organizational management skills.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Principles of Management", "Financial Accounting", "Micro & Macro Economics", "Business Mathematics"] },
      { year: "Year 2", subjects: ["Marketing Management", "Human Resource Management", "Management Accounting", "Business Law"] },
      { year: "Year 3", subjects: ["Operations Management", "Corporate Finance", "Business Analytics", "Entrepreneurship"] },
      { year: "Year 4", subjects: ["Strategic Management", "Corporate Internship", "Independent Research Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 90,000 - 220,000 per month",
      topRoles: ["Management Trainee", "Business Analyst", "Financial Controller", "Brand Manager", "HR Business Partner"],
      topEmployers: ["John Keells Holdings", "MAS Holdings", "Commercial Bank", "HNB", "Deloitte / EY / KPMG"]
    })
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
      "Colombo": 1.5500,
      "Gampaha": 1.5800,
      "Kalutara": 1.5700,
      "Kandy": 1.6000,
      "Galle": 1.5900,
      "Kurunegala": 1.5850,
      "Matara": 1.6100
    }),
    overview: "Designed specifically for the Engineering/Bio Technology stream, focusing on software development, network engineering, multimedia systems, and emerging IT technologies.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Fundamentals of Programming", "Computer Architecture", "Web Technologies", "Mathematics for ICT"] },
      { year: "Year 2", subjects: ["Object-Oriented Programming", "Database Systems", "Data Structures & Algorithms", "Computer Networks"] },
      { year: "Year 3", subjects: ["Software Engineering", "Mobile Application Development", "Cloud Infrastructure", "Cybersecurity"] },
      { year: "Year 4", subjects: ["6-Month Industrial Placement", "Final Year Software/Research Project", "IT Project Management"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 110,000 - 260,000 per month",
      topRoles: ["Software Developer", "Network & Cloud Engineer", "DevOps Engineer", "UI/UX Engineer", "QA Automation Engineer"],
      topEmployers: ["WSO2", "Virtusa", "99x", "IFS", "Dialog Axiata"]
    })
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
      "Colombo": 1.6800,
      "Gampaha": 1.7100,
      "Kandy": 1.7300,
      "Galle": 1.7200,
      "Kurunegala": 1.7150
    }),
    overview: "Sri Lanka's premier academic law program covering constitutional law, criminal law, commercial law, human rights, and international legal frameworks.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Constitutional Law", "Criminal Law", "Legal Systems & Legal Method", "Roman Law"] },
      { year: "Year 2", subjects: ["Law of Contract", "Law of Delict (Tort)", "Land Law", "Family Law"] },
      { year: "Year 3", subjects: ["Commercial & Company Law", "Administrative Law", "Public International Law", "Equity & Trusts"] },
      { year: "Year 4", subjects: ["Jurisprudence", "Human Rights Law", "Intellectual Property Law", "Research Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "Varies widely (Corporate Counsel: LKR 120,000 - 300,000+)",
      topRoles: ["Attorney-at-Law", "Corporate Legal Counsel", "Legal Researcher", "Compliance Officer", "State Counsel"],
      topEmployers: ["Leading Law Firms", "Corporate Legal Departments", "Attorney General's Department", "International NGOs"]
    })
  }
];

console.log('Seeding expanded UGC dataset into SQLite database...');

db.serialize(() => {
  db.run(`DELETE FROM courses`, (err) => {
    if (err) console.error('Error clearing old courses:', err.message);
  });

  const stmt = db.prepare(`
    INSERT INTO courses 
    (code, name, university, shortName, stream, faculty, duration, medium, jobDemand, intake, districtCutoffs, overview, yearContent, jobMarket) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  ugcCourses.forEach(c => {
    stmt.run(
      c.code, c.name, c.university, c.shortName, c.stream, c.faculty,
      c.duration, c.medium, c.jobDemand, c.intake, c.districtCutoffs,
      c.overview, c.yearContent, c.jobMarket
    );
  });

  stmt.finalize(() => {
    console.log(`✅ Successfully seeded ${ugcCourses.length} UGC degree programs across all streams!`);
    process.exit(0);
  });
});