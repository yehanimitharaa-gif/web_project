const db = require('./database');

const ugcCourses = [
  // ==========================================
  // 1. UNIVERSITY OF COLOMBO (UoC) - 8 Degrees
  // ==========================================
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
      "Colombo": 1.6500, "Gampaha": 1.6850, "Kalutara": 1.6900,
      "Kandy": 1.7100, "Galle": 1.7050, "Matara": 1.7150, "Kurunegala": 1.6950
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
  {
    code: "UOC-IS",
    name: "BSc in Information Systems (Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Commerce",
    faculty: "University of Colombo School of Computing (UCSC)",
    duration: "3 / 4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 110,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5200, "Gampaha": 1.5500, "Kalutara": 1.5400,
      "Kandy": 1.5700, "Galle": 1.5600, "Kurunegala": 1.5550
    }),
    overview: "Bridges business management and computing, preparing graduates to design, implement, and manage enterprise IT solutions.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Information Systems Fundamentals", "Programming Concepts", "Business Accounting", "Database Design"] },
      { year: "Year 2", subjects: ["Systems Analysis & Design", "Enterprise Resource Planning", "Web Application Development", "Business Statistics"] },
      { year: "Year 3", subjects: ["IT Project Management", "Business Intelligence", "Information Security Governance", "Industry Group Project"] },
      { year: "Year 4 (Hons)", subjects: ["Enterprise Architecture", "Digital Transformation Strategy", "Research Thesis", "Industrial Internship"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 110,000 - 250,000 per month",
      topRoles: ["Business Analyst", "ERP Consultant", "IT Project Manager", "Product Manager", "Systems Analyst"],
      topEmployers: ["IFS", "Virtusa", "John Keells IT", "Deloitte", "EY"]
    })
  },
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
      "Colombo": 2.0200, "Gampaha": 2.0500, "Kalutara": 2.0600,
      "Kandy": 2.0800, "Galle": 2.0750, "Matara": 2.0850, "Kurunegala": 2.0650
    }),
    overview: "One of South Asia's oldest medical degrees, preparing students for clinical practice, surgery, and medical research through hands-on hospital training.",
    yearContent: JSON.stringify([
      { year: "Year 1 - 2 (Pre-Clinical)", subjects: ["Human Anatomy", "Physiology", "Biochemistry", "Community Medicine"] },
      { year: "Year 3 - 4 (Para-Clinical)", subjects: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine & Parasitology"] },
      { year: "Year 5 (Final Clinical)", subjects: ["Clinical Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Psychiatry"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "Government Medical Officer Scale + Allowances",
      topRoles: ["Medical Officer", "Consultant Surgeon / Physician", "Medical Researcher", "Public Health Specialist"],
      topEmployers: ["Ministry of Health Sri Lanka", "Private Hospital Chains", "NHS (UK) & International Healthcare"]
    })
  },
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
      "Colombo": 1.6800, "Gampaha": 1.7100, "Kandy": 1.7300,
      "Galle": 1.7200, "Kurunegala": 1.7150
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
      averageSalary: "LKR 120,000 - 300,000+ (Corporate Sector)",
      topRoles: ["Attorney-at-Law", "Corporate Legal Counsel", "Legal Researcher", "Compliance Officer", "State Counsel"],
      topEmployers: ["Leading Law Firms", "Corporate Legal Departments", "Attorney General's Department", "International NGOs"]
    })
  },
  {
    code: "UOC-ECO",
    name: "BA in Economics (Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Arts",
    faculty: "Faculty of Arts",
    duration: "4 Years",
    medium: "English / Sinhala",
    jobDemand: "High",
    intake: 120,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.4500, "Gampaha": 1.4700, "Kalutara": 1.4900,
      "Kandy": 1.5100, "Galle": 1.5000, "Matara": 1.5200, "Kurunegala": 1.4800
    }),
    overview: "An academic programme focusing on economic theories, financial systems, public policy, econometrics, and international trade.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Microeconomics", "Macroeconomics", "Introduction to Statistics", "Economic History"] },
      { year: "Year 2", subjects: ["Development Economics", "Public Finance", "International Economics", "Econometrics"] },
      { year: "Year 3", subjects: ["Monetary Economics", "Financial Economics", "Quantitative Methods", "Economic Policy"] },
      { year: "Year 4", subjects: ["Applied Econometrics", "Global Trade Policy", "Independent Research Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 85,000 - 200,000 per month",
      topRoles: ["Economic Analyst", "Policy Researcher", "Banking Executive", "Financial Analyst", "Investment Officer"],
      topEmployers: ["Central Bank of Sri Lanka", "Commercial Banks", "World Bank / UNDP", "Policy Think Tanks"]
    })
  },
  {
    code: "UOC-MBB",
    name: "BSc in Molecular Biology and Biochemistry (Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Biological Science",
    faculty: "Faculty of Science",
    duration: "4 Years",
    medium: "English",
    jobDemand: "High",
    intake: 60,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.6800, "Gampaha": 1.7100, "Kalutara": 1.7200,
      "Kandy": 1.7400, "Galle": 1.7300, "Kurunegala": 1.7150
    }),
    overview: "Specializes in genetics, cellular biology, recombinant DNA technology, and biochemical research for medical and industrial biotechnology.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Cell Biology", "General Chemistry", "Fundamentals of Genetics", "Biostatistics"] },
      { year: "Year 2", subjects: ["Enzymology & Metabolism", "Molecular Genetics", "Microbiology", "Analytical Biochemistry"] },
      { year: "Year 3", subjects: ["Genetic Engineering", "Immunology", "Bioinformatics", "Proteomics & Genomics"] },
      { year: "Year 4", subjects: ["Advanced Molecular Diagnostics", "Laboratory Research Thesis", "Biotechnology Applications"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 90,000 - 210,000 per month",
      topRoles: ["Molecular Biologist", "Clinical Research Scientist", "Biotech Specialist", "Forensic Scientist"],
      topEmployers: ["Genetech", "Medical Research Institute (MRI)", "Pharmaceutical Companies", "International Research Labs"]
    })
  },
  {
    code: "UOC-ISMF",
    name: "BSc in Industrial Statistics & Mathematical Finance (Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Physical Science",
    faculty: "Faculty of Science",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 75,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.4800, "Gampaha": 1.5100, "Kalutara": 1.5200,
      "Kandy": 1.5400, "Galle": 1.5300, "Kurunegala": 1.5150
    }),
    overview: "Combines advanced statistical modeling, actuarial mathematics, and quantitative finance for banking, insurance, and data analytics sectors.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Probability Theory", "Calculus & Linear Algebra", "Statistical Inference", "Programming in R/Python"] },
      { year: "Year 2", subjects: ["Stochastic Processes", "Financial Mathematics", "Regression Analysis", "Operations Research"] },
      { year: "Year 3", subjects: ["Actuarial Science", "Time Series Forecasting", "Risk Modeling", "Quality Control"] },
      { year: "Year 4", subjects: ["Quantitative Finance", "Data Mining & Machine Learning", "Industrial Internship", "Research Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 120,000 - 280,000 per month",
      topRoles: ["Actuarial Analyst", "Quantitative Analyst", "Data Scientist", "Risk Manager", "Statistician"],
      topEmployers: ["AIA Insurance", "Ceylinco Life", "Commercial Banks", "MAS Holdings", "Dialog Axiata"]
    })
  },
  {
    code: "UOC-BBA",
    name: "Bachelor of Business Administration (BBA Hons)",
    university: "University of Colombo",
    shortName: "UoC",
    stream: "Commerce",
    faculty: "Faculty of Management & Finance",
    duration: "4 Years",
    medium: "English",
    jobDemand: "High",
    intake: 200,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.4400, "Gampaha": 1.4700, "Kalutara": 1.4600,
      "Kandy": 1.4900, "Galle": 1.4800, "Kurunegala": 1.4750
    }),
    overview: "Offers specialized pathways in Finance, Marketing, Accounting, Human Resource Management, and International Business in English medium.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Management Principles", "Financial Accounting", "Business Economics", "Quantitative Techniques"] },
      { year: "Year 2", subjects: ["Organizational Behavior", "Marketing Management", "Corporate Finance", "Business Information Systems"] },
      { year: "Year 3", subjects: ["Specialization Core Modules", "Business Analytics", "Research Methodology", "Strategic Operations"] },
      { year: "Year 4", subjects: ["Strategic Management", "Corporate Internship", "Independent Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 90,000 - 220,000 per month",
      topRoles: ["Management Trainee", "Financial Analyst", "Marketing Strategist", "HR Consultant", "Business Development Manager"],
      topEmployers: ["Unilever", "John Keells Holdings", "Brandix", "HSBC", "Standard Chartered"]
    })
  },

  // ==========================================
  // 2. UNIVERSITY OF MORATUWA (UoM) - 8 Degrees
  // ==========================================
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
      "Colombo": 1.8500, "Gampaha": 1.8800, "Kalutara": 1.9000,
      "Kandy": 1.9200, "Galle": 1.9150, "Matara": 1.9300, "Kurunegala": 1.8950
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
  {
    code: "UOM-IT",
    name: "BSc (Hons) in Information Technology",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Physical Science",
    faculty: "Faculty of Information Technology",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 160,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5800, "Gampaha": 1.6100, "Kalutara": 1.6200,
      "Kandy": 1.6400, "Galle": 1.6300, "Matara": 1.6450, "Kurunegala": 1.6150
    }),
    overview: "Focuses on enterprise software development, cloud computing, artificial intelligence, and system architecture with strong industry integration.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Programming Fundamentals", "Computer Organization", "Web Technologies", "Mathematics for Computing"] },
      { year: "Year 2", subjects: ["Data Structures & Algorithms", "Database Management", "Software Engineering", "Computer Networks"] },
      { year: "Year 3", subjects: ["Distributed Systems", "Machine Learning", "6-Month Industrial Training", "Human-Computer Interaction"] },
      { year: "Year 4", subjects: ["Comprehensive Research Project", "Cloud Native Engineering", "Cybersecurity", "IT Entrepreneurship"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 130,000 - 300,000+ per month",
      topRoles: ["Full Stack Software Engineer", "DevOps Engineer", "Cloud Architect", "Data Engineer", "AI Engineer"],
      topEmployers: ["WSO2", "Sysco LABS", "IFS", "99x", "Wiley Global Technology"]
    })
  },
  {
    code: "UOM-AI",
    name: "BSc (Hons) in Artificial Intelligence",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Physical Science",
    faculty: "Faculty of Information Technology",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 80,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.6600, "Gampaha": 1.6900, "Kalutara": 1.7000,
      "Kandy": 1.7200, "Galle": 1.7100, "Kurunegala": 1.6950
    }),
    overview: "A specialized degree dedicated to machine learning, deep learning, natural language processing, computer vision, and intelligent robotics.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Linear Algebra & Calculus", "Python for AI", "Discrete Structures", "Foundations of AI"] },
      { year: "Year 2", subjects: ["Machine Learning Algorithms", "Probability & Statistics", "Data Engineering", "Knowledge Representation"] },
      { year: "Year 3", subjects: ["Deep Learning & Neural Networks", "Computer Vision", "Natural Language Processing", "Industrial Training"] },
      { year: "Year 4", subjects: ["Reinforcement Learning", "AI Ethics & Governance", "AI Research Thesis", "Autonomous Systems"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 150,000 - 350,000+ per month",
      topRoles: ["AI/ML Engineer", "Computer Vision Engineer", "NLP Specialist", "Data Scientist", "AI Research Scientist"],
      topEmployers: ["Sysco LABS", "LSEG", "OCTAVE (John Keells)", "Surge Global", "International AI Labs"]
    })
  },
  {
    code: "UOM-ITM",
    name: "BSc (Hons) in Information Technology & Management",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Commerce",
    faculty: "Faculty of Information Technology",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 120,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5400, "Gampaha": 1.5700, "Kalutara": 1.5600,
      "Kandy": 1.5900, "Galle": 1.5800, "Kurunegala": 1.5750
    }),
    overview: "Combines core software engineering and data analytics with business management, finance, and enterprise systems.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Software Development", "Principles of Management", "Financial Accounting", "Database Systems"] },
      { year: "Year 2", subjects: ["Object-Oriented Programming", "Business Analytics", "Marketing & Operations", "System Analysis"] },
      { year: "Year 3", subjects: ["Enterprise Applications", "IT Project Management", "6-Month Industrial Training"] },
      { year: "Year 4", subjects: ["Digital Business Strategy", "Business Intelligence", "Final Year Research Project"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 120,000 - 270,000 per month",
      topRoles: ["Technical Business Analyst", "Software Engineer", "Product Owner", "ERP Functional Consultant", "Data Analyst"],
      topEmployers: ["IFS", "Virtusa", "MAS Holdings", "John Keells", "Commercial Bank"]
    })
  },
  {
    code: "UOM-ARCH",
    name: "Bachelor of Architecture (BArch Hons)",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Physical Science",
    faculty: "Faculty of Architecture",
    duration: "5 Years",
    medium: "English",
    jobDemand: "High",
    intake: 80,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.4200, "Gampaha": 1.4500, "Kalutara": 1.4600,
      "Kandy": 1.4800, "Galle": 1.4700, "Kurunegala": 1.4550
    }),
    overview: "An RIBA-accredited professional degree in architectural design, sustainable urbanism, building technology, and spatial planning (requires Aptitude Test).",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Architectural Design Studio I", "History of Architecture", "Building Construction", "Visual Communication"] },
      { year: "Year 2", subjects: ["Architectural Design Studio II", "Structural Systems", "Environmental Science", "CAD & BIM Modeling"] },
      { year: "Year 3", subjects: ["Urban Design", "Sustainable Architecture", "Building Services", "Practical Training Placement"] },
      { year: "Year 4 - 5", subjects: ["Comprehensive Design Thesis", "Professional Practice & Law", "Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 100,000 - 280,000+ per month",
      topRoles: ["Chartered Architect", "Urban Designer", "Interior Architect", "BIM Manager", "Project Architect"],
      topEmployers: ["Architectural Consultancies", "Property Developers", "UDA", "International Design Firms"]
    })
  },
  {
    code: "UOM-QS",
    name: "BSc (Hons) in Quantity Surveying",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Physical Science",
    faculty: "Faculty of Architecture",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 120,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5600, "Gampaha": 1.5900, "Kalutara": 1.6000,
      "Kandy": 1.6200, "Galle": 1.6100, "Kurunegala": 1.5950
    }),
    overview: "Internationally accredited program in construction economics, cost management, procurement, and contract administration with high Middle East and global demand.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Measurement & Quantification", "Construction Technology", "Construction Economics", "Law of Contract"] },
      { year: "Year 2", subjects: ["Cost Planning & Control", "Procurement Systems", "Building Services Measurement", "Project Management"] },
      { year: "Year 3", subjects: ["Commercial Management", "Dispute Resolution & Arbitration", "8-Month Industrial Training"] },
      { year: "Year 4", subjects: ["Strategic Construction Management", "Value Engineering", "Research Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 110,000 - 300,000+ (High Overseas Demand)",
      topRoles: ["Quantity Surveyor", "Commercial Manager", "Cost Consultant", "Contracts Manager", "Estimator"],
      topEmployers: ["Maga Engineering", "Access Engineering", "International Construction Firms (UAE/Qatar/UK)"]
    })
  },
  {
    code: "UOM-TLM",
    name: "BSc (Hons) in Transport and Logistics Management",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Physical Science",
    faculty: "Faculty of Engineering",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 90,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5500, "Gampaha": 1.5800, "Kalutara": 1.5900,
      "Kandy": 1.6100, "Galle": 1.6000, "Kurunegala": 1.5850
    }),
    overview: "Specializes in global supply chain management, maritime and aviation logistics, transport planning, and operations analytics.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Transport Economics", "Supply Chain Fundamentals", "Quantitative Methods", "Logistics Operations"] },
      { year: "Year 2", subjects: ["Maritime & Port Operations", "Aviation Management", "Inventory & Warehouse Management", "GIS in Transport"] },
      { year: "Year 3", subjects: ["Global Supply Chain Strategy", "Transport Modeling", "6-Month Industrial Internship"] },
      { year: "Year 4", subjects: ["Sustainable Logistics", "Supply Chain Analytics", "Research Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 115,000 - 260,000 per month",
      topRoles: ["Supply Chain Analyst", "Logistics Manager", "Port Operations Executive", "Demand Planner", "Aviation Analyst"],
      topEmployers: ["Maersk", "Hayleys Advantis", "SAGT / CICT Ports", "MAS Holdings", "SriLankan Airlines"]
    })
  },
  {
    code: "UOM-FD",
    name: "Bachelor of Design (Hons) in Fashion Design & Product Development",
    university: "University of Moratuwa",
    shortName: "UoM",
    stream: "Arts",
    faculty: "Faculty of Architecture",
    duration: "4 Years",
    medium: "English",
    jobDemand: "High",
    intake: 70,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.2500, "Gampaha": 1.2800, "Kalutara": 1.2900,
      "Kandy": 1.3100, "Galle": 1.3000, "Kurunegala": 1.2850
    }),
    overview: "Open to all streams (with Aptitude Test), developing creative designers and product developers for Sri Lanka's global apparel industry.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Design Fundamentals", "Fashion Illustration", "Textile Science", "Pattern Making & Garment Construction"] },
      { year: "Year 2", subjects: ["Apparel Product Development", "CAD for Fashion", "History of Costume", "Surface Design"] },
      { year: "Year 3", subjects: ["Sustainable Fashion", "Brand Management & Merchandising", "Industrial Internship"] },
      { year: "Year 4", subjects: ["Graduate Fashion Collection", "Portfolio Development", "Design Research Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 90,000 - 220,000 per month",
      topRoles: ["Fashion Designer", "Product Developer", "Technical Designer", "Fashion Merchandiser", "Brand Stylist"],
      topEmployers: ["MAS Holdings", "Brandix", "Hirdaramani", "Odel", "Global Apparel Brands"]
    })
  },

  // ==================================================
  // 3. UNIVERSITY OF SRI JAYEWARDENEPURA (USJ) - 8 Degrees
  // ==================================================
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
      "Colombo": 1.4800, "Gampaha": 1.5100, "Kalutara": 1.5000,
      "Kandy": 1.5300, "Galle": 1.5200, "Kurunegala": 1.5150
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
  {
    code: "USJ-ACC",
    name: "BSc in Accounting (Special)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Commerce",
    faculty: "Faculty of Management Studies & Commerce",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 220,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5500, "Gampaha": 1.5800, "Kalutara": 1.5700,
      "Kandy": 1.6000, "Galle": 1.5900, "Kurunegala": 1.5850
    }),
    overview: "Sri Lanka's flagship accounting degree offering maximum exemptions for CA Sri Lanka, CIMA, and ACCA with a mandatory 2-year corporate internship.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Financial Accounting", "Business Mathematics & Statistics", "Microeconomics", "Management Principles"] },
      { year: "Year 2", subjects: ["Advanced Financial Reporting", "Management Accounting", "Commercial Law", "Taxation"] },
      { year: "Year 3", subjects: ["Auditing & Assurance", "Corporate Finance", "Accounting Information Systems", "Internship I"] },
      { year: "Year 4", subjects: ["Strategic Management Accounting", "Forensic Accounting", "Internship II", "Research Dissertation"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 100,000 - 260,000+ per month",
      topRoles: ["Chartered Accountant", "External/Internal Auditor", "Financial Controller", "Tax Consultant", "Finance Manager"],
      topEmployers: ["KPMG", "EY", "PwC", "Deloitte", "Top Listed Conglomerates"]
    })
  },
  {
    code: "USJ-FIN",
    name: "BSc in Finance (Special)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Commerce",
    faculty: "Faculty of Management Studies & Commerce",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 120,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5100, "Gampaha": 1.5400, "Kalutara": 1.5300,
      "Kandy": 1.5600, "Galle": 1.5500, "Kurunegala": 1.5450
    }),
    overview: "Focuses on corporate finance, investment banking, portfolio management, financial derivatives, and capital markets.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Financial Accounting", "Quantitative Methods", "Economics", "Introduction to Finance"] },
      { year: "Year 2", subjects: ["Corporate Finance", "Financial Markets & Institutions", "Econometrics", "Commercial Banking"] },
      { year: "Year 3", subjects: ["Investment & Portfolio Management", "Financial Risk Management", "International Finance", "Corporate Valuation"] },
      { year: "Year 4", subjects: ["Financial Derivatives", "Behavioral Finance", "Corporate Internship", "Research Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 105,000 - 250,000 per month",
      topRoles: ["Investment Analyst", "Corporate Finance Executive", "Fund Manager", "Credit Analyst", "Treasury Dealer"],
      topEmployers: ["CAL (Capital Alliance)", "NDB Investment Bank", "Commercial Bank", "Sampath Bank", "Colombo Stock Exchange"]
    })
  },
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
      "Colombo": 1.5500, "Gampaha": 1.5800, "Kalutara": 1.5700,
      "Kandy": 1.6000, "Galle": 1.5900, "Kurunegala": 1.5850, "Matara": 1.6100
    }),
    overview: "Designed specifically for the Technology stream, focusing on software development, network engineering, cloud computing, and cybersecurity.",
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
  {
    code: "USJ-BET",
    name: "Bachelor of Engineering Technology (BET Hons)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Technology",
    faculty: "Faculty of Technology",
    duration: "4 Years",
    medium: "English",
    jobDemand: "High",
    intake: 160,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.4800, "Gampaha": 1.5100, "Kalutara": 1.5200,
      "Kandy": 1.5400, "Galle": 1.5300, "Kurunegala": 1.5150
    }),
    overview: "An SLQF Level 6 technology degree specializing in Mechatronics, Polymer Processing, Construction, and Automobile Engineering Technology.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Engineering Mathematics", "Applied Mechanics", "Electrical Fundamentals", "Engineering Drawing & CAD"] },
      { year: "Year 2", subjects: ["Thermodynamics & Fluid Mechanics", "Electronics & Microcontrollers", "Material Science", "Manufacturing Tech"] },
      { year: "Year 3", subjects: ["Robotics & Automation", "Industrial Control Systems", "Quality Management", "Project Design"] },
      { year: "Year 4", subjects: ["6-Month Industrial Training", "Capstone Engineering Project", "Operations Management"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 95,000 - 220,000 per month",
      topRoles: ["Mechatronics Technologist", "Automation Engineer", "Production Engineer", "Quality Assurance Engineer"],
      topEmployers: ["MAS Holdings", "Loadstar (Camso)", "DIMO", "Unilever", "Ceylon Tobacco Company"]
    })
  },
  {
    code: "USJ-BST",
    name: "Bachelor of Biosystems Technology (BBST Hons)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Technology",
    faculty: "Faculty of Technology",
    duration: "4 Years",
    medium: "English",
    jobDemand: "High",
    intake: 140,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.4200, "Gampaha": 1.4500, "Kalutara": 1.4600,
      "Kandy": 1.4800, "Galle": 1.4700, "Kurunegala": 1.4550
    }),
    overview: "For Bio-Technology stream students, focusing on industrial bioprocessing, food technology, environmental biotechnology, and agricultural technology.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Cell & Molecular Biology", "Applied Chemistry", "Microbiology", "Biostatistics"] },
      { year: "Year 2", subjects: ["Bioprocess Engineering", "Food Processing Technology", "Environmental Monitoring", "Instrumentation"] },
      { year: "Year 3", subjects: ["Industrial Biotechnology", "Waste Management Tech", "Quality Assurance & ISO", "Applied Research"] },
      { year: "Year 4", subjects: ["6-Month Industrial Placement", "Final Year Research Project", "Bio-Entrepreneurship"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 85,000 - 180,000 per month",
      topRoles: ["Bioprocess Technologist", "Food Quality Officer", "Environmental Consultant", "R&D Executive"],
      topEmployers: ["Nestlé", "Fonterra", "Hayleys Agriculture", "Central Environmental Authority", "Cargills"]
    })
  },
  {
    code: "USJ-MED",
    name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Biological Science",
    faculty: "Faculty of Medical Sciences",
    duration: "5 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 165,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.9600, "Gampaha": 1.9900, "Kalutara": 2.0000,
      "Kandy": 2.0200, "Galle": 2.0150, "Matara": 2.0250, "Kurunegala": 2.0050
    }),
    overview: "Provides comprehensive clinical and medical training affiliated with Colombo South Teaching Hospital (Kalubowila) and Sri Jayewardenepura General Hospital.",
    yearContent: JSON.stringify([
      { year: "Year 1 - 2 (Pre-Clinical)", subjects: ["Anatomy", "Physiology", "Biochemistry", "Behavioral Sciences"] },
      { year: "Year 3 - 4 (Para-Clinical)", subjects: ["Pathology", "Microbiology", "Pharmacology", "Community Medicine", "Forensic Medicine"] },
      { year: "Year 5 (Final Clinical)", subjects: ["Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Psychiatry"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "Government Medical Officer Scale + Allowances",
      topRoles: ["Medical Officer", "Specialist Consultant", "Clinical Researcher", "Medical Administrator"],
      topEmployers: ["Ministry of Health", "Sri Jayewardenepura General Hospital", "Private Hospitals", "Global Healthcare"]
    })
  },
  {
    code: "USJ-SE",
    name: "Bachelor of Computing Honours in Software Engineering",
    university: "University of Sri Jayewardenepura",
    shortName: "USJ",
    stream: "Physical Science",
    faculty: "Faculty of Computing",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 90,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5600, "Gampaha": 1.5900, "Kalutara": 1.6000,
      "Kandy": 1.6200, "Galle": 1.6100, "Kurunegala": 1.5950
    }),
    overview: "Focuses on large-scale software architecture, agile engineering, DevOps, quality engineering, and modern full-stack application development.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Programming Fundamentals", "Discrete Mathematics", "Computer Systems", "Web Engineering"] },
      { year: "Year 2", subjects: ["Data Structures & Algorithms", "Software Design & Architecture", "Database Systems", "Operating Systems"] },
      { year: "Year 3", subjects: ["Software Quality Assurance", "Cloud & Microservices", "Mobile Computing", "Agile Project"] },
      { year: "Year 4", subjects: ["DevOps & Site Reliability", "6-Month Industrial Internship", "Software Engineering Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 125,000 - 290,000+ per month",
      topRoles: ["Software Engineer", "Solutions Architect", "DevOps Engineer", "QA Lead", "Mobile App Developer"],
      topEmployers: ["WSO2", "Sysco LABS", "IFS", "99x", "LSEG Technology"]
    })
  },

  // ==========================================
  // 4. UNIVERSITY OF PERADENIYA (UoP) - 6 Degrees
  // ==========================================
  {
    code: "UOP-ENG",
    name: "BSc Engineering (Hons)",
    university: "University of Peradeniya",
    shortName: "UoP",
    stream: "Physical Science",
    faculty: "Faculty of Engineering",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 450,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.7200, "Gampaha": 1.7500, "Kalutara": 1.7600,
      "Kandy": 1.7800, "Galle": 1.7750, "Matara": 1.7900, "Kurunegala": 1.7550
    }),
    overview: "Sri Lanka's oldest engineering faculty offering specializations in Civil, Mechanical, Electrical & Electronic, Computer, Chemical, and Production Engineering.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Engineering Mathematics", "Engineering Mechanics", "Thermodynamics", "Computing & Programming"] },
      { year: "Year 2", subjects: ["Field Specialization Core", "Fluid Mechanics / Circuits", "Engineering Materials", "Numerical Analysis"] },
      { year: "Year 3", subjects: ["Advanced Engineering Design", "Control & Automation", "Industrial Training Placement"] },
      { year: "Year 4", subjects: ["Final Year Design & Research Project", "Engineering Management", "Professional Ethics"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 130,000 - 320,000+ per month",
      topRoles: ["Civil Engineer", "Electrical Engineer", "Computer Engineer", "Mechanical Engineer", "Chemical Engineer"],
      topEmployers: ["CEB", "Water Board", "WSO2", "MAS Holdings", "International Engineering Consultancies"]
    })
  },
  {
    code: "UOP-MED",
    name: "Bachelor of Medicine, Bachelor of Surgery (MBBS)",
    university: "University of Peradeniya",
    shortName: "UoP",
    stream: "Biological Science",
    faculty: "Faculty of Medicine",
    duration: "5 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 210,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.9400, "Gampaha": 1.9700, "Kalutara": 1.9800,
      "Kandy": 2.0000, "Galle": 1.9950, "Matara": 2.0050, "Kurunegala": 1.9850
    }),
    overview: "Renowned medical degree offering clinical rotations at Teaching Hospital Peradeniya and National Hospital Kandy.",
    yearContent: JSON.stringify([
      { year: "Year 1 - 2 (Pre-Clinical)", subjects: ["Human Anatomy", "Medical Physiology", "Biochemistry", "Communication & Ethics"] },
      { year: "Year 3 - 4 (Para-Clinical)", subjects: ["Pathology", "Pharmacology", "Microbiology", "Parasitology", "Forensic Medicine"] },
      { year: "Year 5 (Final Clinical)", subjects: ["Clinical Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Psychiatry"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "Government Medical Officer Scale + Allowances",
      topRoles: ["Medical Officer", "Consultant Physician / Surgeon", "Academic Researcher", "Public Health Director"],
      topEmployers: ["Ministry of Health Sri Lanka", "National Hospital Kandy", "Private Hospitals", "Global Healthcare"]
    })
  },
  {
    code: "UOP-BDS",
    name: "Bachelor of Dental Surgery (BDS)",
    university: "University of Peradeniya",
    shortName: "UoP",
    stream: "Biological Science",
    faculty: "Faculty of Dental Sciences",
    duration: "5 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 100,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.8500, "Gampaha": 1.8800, "Kalutara": 1.8900,
      "Kandy": 1.9100, "Galle": 1.9000, "Kurunegala": 1.8850
    }),
    overview: "Sri Lanka's sole Faculty of Dental Sciences, training dental surgeons in oral medicine, orthodontics, oral surgery, and restorative dentistry.",
    yearContent: JSON.stringify([
      { year: "Year 1 - 2", subjects: ["General Anatomy & Physiology", "Oral Biology", "Dental Materials", "Biochemistry"] },
      { year: "Year 3 - 4", subjects: ["General Pathology & Microbiology", "Conservative Dentistry", "Prosthodontics", "Periodontology"] },
      { year: "Year 5", subjects: ["Oral & Maxillofacial Surgery", "Orthodontics", "Pediatric Dentistry", "Clinical Dental Practice"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "Government Dental Surgeon Scale + Private Practice",
      topRoles: ["Dental Surgeon", "Orthodontist", "Oral & Maxillofacial Surgeon", "Dental Researcher"],
      topEmployers: ["Ministry of Health", "Dental Hospital Peradeniya", "Private Dental Clinics", "International Healthcare"]
    })
  },
  {
    code: "UOP-VET",
    name: "Bachelor of Veterinary Science (BVSc)",
    university: "University of Peradeniya",
    shortName: "UoP",
    stream: "Biological Science",
    faculty: "Faculty of Veterinary Medicine & Animal Science",
    duration: "5 Years",
    medium: "English",
    jobDemand: "High",
    intake: 85,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.7200, "Gampaha": 1.7500, "Kalutara": 1.7600,
      "Kandy": 1.7800, "Galle": 1.7700, "Kurunegala": 1.7550
    }),
    overview: "The only veterinary degree in Sri Lanka, covering animal health, veterinary surgery, wildlife medicine, livestock production, and zoonotic disease control.",
    yearContent: JSON.stringify([
      { year: "Year 1 - 2", subjects: ["Veterinary Anatomy", "Animal Physiology", "Animal Nutrition", "Veterinary Biochemistry"] },
      { year: "Year 3 - 4", subjects: ["Veterinary Pathology", "Pharmacology", "Parasitology", "Livestock Production & Public Health"] },
      { year: "Year 5", subjects: ["Small & Large Animal Medicine", "Veterinary Surgery", "Wildlife & Aquatic Medicine", "Clinical Externship"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "High",
      averageSalary: "LKR 100,000 - 250,000+ per month",
      topRoles: ["Veterinary Surgeon", "Livestock Development Officer", "Wildlife Veterinarian", "Animal Health Consultant"],
      topEmployers: ["Department of Animal Production & Health", "Department of Wildlife", "Private Vet Hospitals", "Agri-Livestock Firms"]
    })
  },
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
      "Colombo": 1.3200, "Gampaha": 1.3500, "Kandy": 1.3800,
      "Kurunegala": 1.3600, "Galle": 1.3700
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
  {
    code: "UOP-PHARM",
    name: "Bachelor of Pharmacy (BPharm Hons)",
    university: "University of Peradeniya",
    shortName: "UoP",
    stream: "Biological Science",
    faculty: "Faculty of Allied Health Sciences",
    duration: "4 Years",
    medium: "English",
    jobDemand: "Very High",
    intake: 70,
    districtCutoffs: JSON.stringify({
      "Colombo": 1.5400, "Gampaha": 1.5700, "Kalutara": 1.5800,
      "Kandy": 1.6000, "Galle": 1.5900, "Kurunegala": 1.5750
    }),
    overview: "Trains clinical and industrial pharmacists in pharmaceutics, medicinal chemistry, pharmacology, drug formulation, and hospital pharmacy management.",
    yearContent: JSON.stringify([
      { year: "Year 1", subjects: ["Human Physiology", "Pharmaceutical Chemistry", "Pharmaceutics I", "Pharmacognosy"] },
      { year: "Year 2", subjects: ["Pharmacology I", "Pharmaceutical Microbiology", "Medicinal Chemistry", "Pharmaceutical Analysis"] },
      { year: "Year 3", subjects: ["Clinical Pharmacy", "Industrial Pharmacy & Formulation", "Pharmacology II", "Pharmacy Law & Ethics"] },
      { year: "Year 4", subjects: ["Hospital & Community Pharmacy Clerkship", "Drug Regulatory Affairs", "Research Thesis"] }
    ]),
    jobMarket: JSON.stringify({
      demandLevel: "Very High",
      averageSalary: "LKR 95,000 - 230,000+ per month",
      topRoles: ["Clinical Pharmacist", "Industrial Pharmacist", "Regulatory Affairs Executive", "Quality Control Chemist"],
      topEmployers: ["State Pharmaceuticals Corporation (SPC)", "Hemas Pharmaceuticals", "Sunshine Healthcare", "Private Hospitals"]
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
    console.log(`✅ Successfully seeded ${ugcCourses.length} UGC degree programs across UoC, UoM, USJ & UoP!`);
    process.exit(0);
  });
});