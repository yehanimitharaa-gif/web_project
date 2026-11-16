import { universities } from "./data";
import type { University, Degree } from "./data";
import { programMeta, programDemand, districtOffset } from "./demand";
import type { Stream } from "./demand";

export type Profile = {
  zscore: number;
  district: string;
  stream: Stream;
  // optional preferences
  interests: string[];
  medium: string;   // "Any" | "English" | "Sinhala" | "Tamil"
  location: string; // "Any" | city
  preferHighDemand: boolean;
};

export type Chance = "Safe" | "Likely" | "Reach";

export type Suggestion = {
  uni: University;
  degree: Degree;
  programId: string;
  cutoff: number;
  margin: number;
  chance: Chance;
  score: number; // 0-100
  reasons: string[];
};

export const cutoffFor = (uniId: string, programId: string, district: string): number | null => {
  const row = programDemand[programId]?.find((r) => r.uniId === uniId);
  if (!row) return null;
  return Math.round((row.cutoff + (districtOffset[district] ?? 0)) * 100) / 100;
};

export function suggest(p: Profile): Suggestion[] {
  const out: Suggestion[] = [];

  for (const uni of universities) {
    for (const degree of uni.degrees) {
      const meta = programMeta[degree.name];
      if (!meta || !meta.streams.includes(p.stream)) continue;

      const cutoff = cutoffFor(uni.id, meta.programId, p.district);
      if (cutoff === null) continue;

      const margin = Math.round((p.zscore - cutoff) * 100) / 100;
      if (margin < -0.1) continue; // too far below the cut-off

      const chance: Chance = margin >= 0.2 ? "Safe" : margin >= 0 ? "Likely" : "Reach";
      const reasons: string[] = [];
      let score = chance === "Safe" ? 28 : chance === "Likely" ? 30 : 12;

      reasons.push(
        margin >= 0
          ? `Your Z-score is ${margin.toFixed(2)} above last year's ${p.district} cut-off (${cutoff.toFixed(2)})`
          : `Just ${Math.abs(margin).toFixed(2)} below the cut-off (${cutoff.toFixed(2)}), possible if the cut-off drops`
      );

      // interests
      if (p.interests.length > 0) {
        const hit = meta.tags.filter((t) => p.interests.includes(t));
        score += (hit.length / Math.max(1, Math.min(p.interests.length, meta.tags.length))) * 40;
        if (hit.length) reasons.push(`Matches your interest: ${hit.join(", ")}`);
      } else {
        score += 20;
      }

      // job market
      const d = degree.jobMarket.demand;
      let jobPts = d === "High" ? 15 : d === "Medium" ? 8 : 2;
      if (p.preferHighDemand) jobPts = d === "High" ? 25 : d === "Medium" ? 8 : 0;
      score += jobPts;
      if (d === "High") reasons.push("High job market demand");

      // location
      if (p.location !== "Any") {
        if (uni.location === p.location) {
          score += 10;
          reasons.push(`Located in ${uni.location}`);
        }
      }

      // medium
      if (p.medium !== "Any") {
        if (degree.medium.includes(p.medium)) {
          score += 5;
          reasons.push(`Available in ${p.medium} medium`);
        } else {
          score -= 15;
          reasons.push(`Not offered in ${p.medium} medium (${degree.medium})`);
        }
      }

      out.push({
        uni,
        degree,
        programId: meta.programId,
        cutoff,
        margin,
        chance,
        score: Math.max(0, Math.min(100, Math.round(score))),
        reasons,
      });
    }
  }

  return out.sort((a, b) => b.score - a.score);
}

//  applicants for a program (last year)
export const topDemandCampus = (programId: string) =>
  [...(programDemand[programId] ?? [])].sort((a, b) => b.applicants - a.applicants)[0];