

export type Stream = "Physical Science" | "Biological Science" | "Commerce" | "Arts" | "Technology";

export const streams: Stream[] = ["Physical Science", "Biological Science", "Commerce", "Arts", "Technology"];

export const districts = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle", "Matara", "Hambantota",
  "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle",
];

// UGC cut-offs differ by district. 
export const districtOffset: Record<string, number> = {
  Colombo: 0, Gampaha: -0.03, Kalutara: -0.06, Kandy: -0.05, Galle: -0.08, Matara: -0.1,
  Kurunegala: -0.12, Matale: -0.14, Kegalle: -0.15, Jaffna: -0.15, Ratnapura: -0.18, Badulla: -0.2,
  Anuradhapura: -0.22, Puttalam: -0.22, Hambantota: -0.25, "Nuwara Eliya": -0.25, Polonnaruwa: -0.28,
  Ampara: -0.28, Batticaloa: -0.28, Trincomalee: -0.3, Monaragala: -0.3, Vavuniya: -0.32,
  Kilinochchi: -0.35, Mannar: -0.35, Mullaitivu: -0.38,
};

export const interestTags = [
  "Technology", "Engineering", "Health & Medicine", "Business & Finance",
  "Law & Politics", "Design & Building", "Agriculture & Environment", "Research",
];

// Links each degree 
export const programMeta: Record<string, { programId: string; streams: Stream[]; tags: string[] }> = {
  "BSc in Computer Science": { programId: "computing", streams: ["Physical Science", "Technology"], tags: ["Technology", "Research"] },
  "BSc in Information Technology": { programId: "computing", streams: ["Physical Science", "Technology"], tags: ["Technology", "Business & Finance"] },
  "LLB (Bachelor of Laws)": { programId: "law", streams: ["Arts", "Commerce", "Physical Science", "Biological Science", "Technology"], tags: ["Law & Politics"] },
  "BSc Engineering (Hons)": { programId: "engineering", streams: ["Physical Science"], tags: ["Engineering", "Design & Building", "Technology"] },
  "B.Arch (Architecture)": { programId: "architecture", streams: ["Physical Science"], tags: ["Design & Building"] },
  "BSc in Business Administration": { programId: "business", streams: ["Commerce", "Arts", "Physical Science"], tags: ["Business & Finance"] },
  "BSc in Accounting & Finance": { programId: "accounting", streams: ["Commerce"], tags: ["Business & Finance"] },
  "MBBS (Medicine)": { programId: "medicine", streams: ["Biological Science"], tags: ["Health & Medicine", "Research"] },
  "BSc Agriculture": { programId: "agriculture", streams: ["Biological Science"], tags: ["Agriculture & Environment", "Research"] },
};

export type CampusDemand = {
  uniId: string;     
  campus: string;
  intake: number;    
  applicants: number; 
  cutoff: number;   
};

export const demandYear = "2024/25";

export const programTitle: Record<string, string> = {
  computing: "Computing / IT",
  law: "Law",
  engineering: "Engineering",
  architecture: "Architecture",
  business: "Business / Management",
  accounting: "Accounting & Finance",
  medicine: "Medicine",
  agriculture: "Agriculture",
};

export const programDemand: Record<string, CampusDemand[]> = {
  computing: [
    { uniId: "uoc", campus: "University of Colombo", intake: 200, applicants: 2800, cutoff: 1.95 },
    { uniId: "uom", campus: "University of Moratuwa", intake: 150, applicants: 3100, cutoff: 1.98 },
    { uniId: "sjp", campus: "University of Sri Jayewardenepura", intake: 120, applicants: 1900, cutoff: 1.75 },
    { uniId: "pdn", campus: "University of Peradeniya", intake: 80, applicants: 900, cutoff: 1.62 },
    { uniId: "kln", campus: "University of Kelaniya", intake: 140, applicants: 1700, cutoff: 1.7 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 90, applicants: 800, cutoff: 1.5 },
    { uniId: "jfn", campus: "University of Jaffna", intake: 70, applicants: 600, cutoff: 1.35 },
  ],
  engineering: [
    { uniId: "uom", campus: "University of Moratuwa", intake: 450, applicants: 3200, cutoff: 2.35 },
    { uniId: "pdn", campus: "University of Peradeniya", intake: 420, applicants: 3000, cutoff: 2.28 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 200, applicants: 1200, cutoff: 2.0 },
    { uniId: "jfn", campus: "University of Jaffna", intake: 150, applicants: 900, cutoff: 1.9 },
  ],
  law: [
    { uniId: "uoc", campus: "University of Colombo", intake: 150, applicants: 2100, cutoff: 1.8 },
    { uniId: "kln", campus: "University of Kelaniya", intake: 120, applicants: 1600, cutoff: 1.7 },
    { uniId: "pdn", campus: "University of Peradeniya", intake: 120, applicants: 1400, cutoff: 1.65 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 100, applicants: 900, cutoff: 1.45 },
  ],
  architecture: [
    { uniId: "uom", campus: "University of Moratuwa", intake: 70, applicants: 600, cutoff: 1.85 },
  ],
  business: [
    { uniId: "sjp", campus: "University of Sri Jayewardenepura", intake: 600, applicants: 4200, cutoff: 1.55 },
    { uniId: "uoc", campus: "University of Colombo", intake: 450, applicants: 3000, cutoff: 1.5 },
    { uniId: "kln", campus: "University of Kelaniya", intake: 500, applicants: 2800, cutoff: 1.4 },
    { uniId: "pdn", campus: "University of Peradeniya", intake: 250, applicants: 1100, cutoff: 1.3 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 300, applicants: 1100, cutoff: 1.2 },
  ],
  accounting: [
    { uniId: "sjp", campus: "University of Sri Jayewardenepura", intake: 300, applicants: 3500, cutoff: 1.65 },
    { uniId: "uoc", campus: "University of Colombo", intake: 250, applicants: 2900, cutoff: 1.6 },
    { uniId: "kln", campus: "University of Kelaniya", intake: 200, applicants: 2200, cutoff: 1.5 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 150, applicants: 1100, cutoff: 1.3 },
  ],
  medicine: [
    { uniId: "uoc", campus: "University of Colombo", intake: 280, applicants: 2000, cutoff: 2.45 },
    { uniId: "pdn", campus: "University of Peradeniya", intake: 300, applicants: 1900, cutoff: 2.42 },
    { uniId: "kln", campus: "University of Kelaniya", intake: 280, applicants: 1800, cutoff: 2.4 },
    { uniId: "sjp", campus: "University of Sri Jayewardenepura", intake: 220, applicants: 1700, cutoff: 2.38 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 270, applicants: 1500, cutoff: 2.3 },
    { uniId: "jfn", campus: "University of Jaffna", intake: 160, applicants: 700, cutoff: 2.15 },
  ],
  agriculture: [
    { uniId: "pdn", campus: "University of Peradeniya", intake: 180, applicants: 800, cutoff: 1.3 },
    { uniId: "ruh", campus: "University of Ruhuna", intake: 150, applicants: 600, cutoff: 1.1 },
    { uniId: "sab", campus: "Sabaragamuwa University", intake: 100, applicants: 400, cutoff: 0.95 },
  ],
};