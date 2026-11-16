import { useState } from "react";
import { programDemand, programTitle, demandYear } from "./demand";
import type { CampusDemand } from "./demand";
import "./Finder.css";

type Metric = "applicants" | "ratio" | "cutoff";

const metricInfo: Record<Metric, { tab: string; title: string }> = {
  applicants: { tab: "Applicants", title: "Number of students who selected this degree" },
  ratio: { tab: "Competition", title: "Applicants per available place" },
  cutoff: { tab: "Cut-off Z-score", title: "Island-level cut-off Z-score" },
};

type Props = {
  programId: string;
  highlightUniId?: string; 
  userZ?: number;          // shows a marker on the chart
};

export default function DemandChart({ programId, highlightUniId, userZ }: Props) {
  const [metric, setMetric] = useState<Metric>("applicants");
  const rows = programDemand[programId];
  if (!rows || rows.length === 0) return <p className="muted">No demand data available.</p>;

  const value = (r: CampusDemand) =>
    metric === "applicants" ? r.applicants : metric === "ratio" ? r.applicants / r.intake : r.cutoff;
  const show = (v: number) => (metric === "applicants" ? v.toLocaleString() : v.toFixed(2));

  const sorted = [...rows].sort((a, b) => value(b) - value(a));
  const max = Math.max(...sorted.map(value));
  const marker = metric === "cutoff" && userZ !== undefined && userZ > 0 ? Math.min(100, (userZ / max) * 100) : null;

  const topApplicants = [...rows].sort((a, b) => b.applicants - a.applicants)[0];

  return (
    <div className="dchart">
      <div className="dchart-head">
        <strong>{programTitle[programId] ?? programId} — demand by campus ({demandYear})</strong>
        <div className="dchart-tabs">
          {(Object.keys(metricInfo) as Metric[]).map((m) => (
            <button key={m} className={metric === m ? "chip active" : "chip"} onClick={() => setMetric(m)}>
              {metricInfo[m].tab}
            </button>
          ))}
        </div>
      </div>
      <p className="muted">{metricInfo[metric].title}</p>

      <div className="dchart-rows">
        {sorted.map((r, i) => (
          <div key={r.uniId} className={"dchart-row" + (r.uniId === highlightUniId ? " mine" : "")}>
            <div className="dchart-label">
              {r.campus}
              {i === 0 && <span className="flag">🔥 Highest</span>}
            </div>
            <div className="dchart-track">
              <div
                className={"dchart-bar" + (i === 0 ? " top" : "")}
                style={{ width: (value(r) / max) * 100 + "%" }}
              />
              {marker !== null && <div className="dchart-marker" style={{ left: marker + "%" }} title="Your Z-score" />}
            </div>
            <div className="dchart-value">{show(value(r))}</div>
          </div>
        ))}
      </div>

      {marker !== null && <p className="muted">┆ dashed line = your Z-score ({userZ!.toFixed(2)})</p>}

      <p className="dchart-note">
        📊 Most applicants last year: <strong>{topApplicants.campus}</strong> ({topApplicants.applicants.toLocaleString()} students,{" "}
        {(topApplicants.applicants / topApplicants.intake).toFixed(1)} per place).
      </p>
      <p className="muted small-note">Sample data. Replace with official UGC statistics before publishing.</p>
    </div>
  );
}