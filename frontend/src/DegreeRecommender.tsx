import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import {
  universities,
  degreeCampusDemand,
  DISTRICTS,
  SUBJECT_STREAMS,
} from "../data";
import type { Degree, University, SubjectStream } from "../data";

const getDistrictAdjustment = (district: string): number => {
  const highComp = ["Colombo", "Gampaha", "Kandy", "Galle", "Matara"];
  const rural = ["Monaragala", "Nuwara Eliya", "Polonnaruwa", "Hambantota", "Badulla"];
  if (highComp.includes(district)) return 0.05;
  if (rural.includes(district)) return -0.12;
  return 0;
};

type SuggestedItem = {
  university: University;
  degree: Degree;
  adjustedCutoff: number;
  chance: "High Chance" | "Borderline" | "Competitive";
  isPreferred: boolean;
};

export function DegreeRecommender() {
  const [zScore, setZScore] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [stream, setStream] = useState<SubjectStream | "">("");
  const [preferredDegrees, setPreferredDegrees] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Selected degree name for the Demand Bar Chart
  const [selectedChartDegree, setSelectedChartDegree] = useState<string>("");

  // Flatten all degrees from `universities` array
  const allDegrees = useMemo(() => {
    const list: { university: University; degree: Degree }[] = [];
    universities.forEach((uni) => {
      uni.degrees.forEach((deg) => {
        list.push({ university: uni, degree: deg });
      });
    });
    return list;
  }, []);

  // Degrees matching selected stream (for optional preference chips)
  const streamDegreeNames = useMemo(() => {
    const filtered = stream
      ? allDegrees.filter((item) => item.degree.stream === stream)
      : allDegrees;
    return Array.from(new Set(filtered.map((item) => item.degree.name)));
  }, [allDegrees, stream]);

  const togglePreference = (degName: string) => {
    setPreferredDegrees((prev) =>
      prev.includes(degName) ? prev.filter((d) => d !== degName) : [...prev, degName]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const numericZ = parseFloat(zScore);
    if (!zScore || isNaN(numericZ) || numericZ < -1 || numericZ > 3.5) {
      setError("Please enter a valid Z-Score (e.g. 1.75).");
      return;
    }
    if (!district) {
      setError("Please select your district.");
      return;
    }
    if (!stream) {
      setError("Please select your A/L subject stream.");
      return;
    }

    setSubmitted(true);

    if (preferredDegrees.length > 0) {
      setSelectedChartDegree(preferredDegrees[0]);
    } else if (streamDegreeNames.length > 0) {
      setSelectedChartDegree(streamDegreeNames[0]);
    }
  };

  // Auto-suggest best matching degrees from `universities`
  const suggestions = useMemo<SuggestedItem[]>(() => {
    if (!submitted || !stream) return [];
    const numericZ = parseFloat(zScore);
    const distAdj = getDistrictAdjustment(district);

    const matches: SuggestedItem[] = [];

    allDegrees.forEach(({ university, degree }) => {
      if (degree.stream !== stream) return;

      const adjustedCutoff = Number((degree.cutoffZ + distAdj).toFixed(2));
      const diff = numericZ - adjustedCutoff;

      if (diff >= -0.15) {
        let chance: "High Chance" | "Borderline" | "Competitive" = "Borderline";
        if (diff >= 0.05) chance = "High Chance";
        else if (diff < 0) chance = "Competitive";

        matches.push({
          university,
          degree,
          adjustedCutoff,
          chance,
          isPreferred: preferredDegrees.includes(degree.name),
        });
      }
    });

    return matches.sort((a, b) => {
      if (a.isPreferred !== b.isPreferred) return a.isPreferred ? -1 : 1;
      return b.adjustedCutoff - a.adjustedCutoff;
    });
  }, [submitted, zScore, district, stream, allDegrees, preferredDegrees]);

  // Sorted campus demand for selected degree
  const chartData = useMemo(() => {
    const list = degreeCampusDemand[selectedChartDegree] || [];
    return [...list].sort((a, b) => b.demandScore - a.demandScore);
  }, [selectedChartDegree]);

  return (
    <div className="recommender-wrapper">
      {/* INPUT FORM */}
      <form className="card form-card" onSubmit={handleSubmit}>
        <h2>🎯 Find Your Best Degree & Campus Demand</h2>
        <p className="subtext">Fill in your A/L results to get auto-suggested degrees and last year's demand chart.</p>

        <div className="form-row">
          <div className="form-group">
            <label>Z-Score *</label>
            <input
              type="number"
              step="0.0001"
              placeholder="e.g. 1.7850"
              value={zScore}
              onChange={(e) => { setZScore(e.target.value); setSubmitted(false); }}
            />
          </div>

          <div className="form-group">
            <label>District *</label>
            <select
              value={district}
              onChange={(e) => { setDistrict(e.target.value); setSubmitted(false); }}
            >
              <option value="">-- Select District --</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subject Stream *</label>
            <select
              value={stream}
              onChange={(e) => {
                setStream(e.target.value as SubjectStream);
                setPreferredDegrees([]);
                setSubmitted(false);
              }}
            >
              <option value="">-- Select Stream --</option>
              {SUBJECT_STREAMS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* OPTIONAL PREFERENCES */}
        <div className="form-group">
          <label>Preferred Degree Programs (Optional)</label>
          <div className="chips-container">
            {streamDegreeNames.map((degName) => {
              const active = preferredDegrees.includes(degName);
              return (
                <button
                  type="button"
                  key={degName}
                  className={`chip ${active ? "selected" : ""}`}
                  onClick={() => togglePreference(degName)}
                >
                  {active ? "✓ " : "+ "} {degName}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="primary">
          Auto-Suggest Degrees & View Demand
        </button>
      </form>

      {/* RESULTS SECTION */}
      {submitted && (
        <div className="results-grid">
          {/* AUTO-SUGGESTED DEGREES */}
          <div className="card">
            <h3>✨ Best Auto-Suggested Degrees</h3>
            <p className="subtext">Click any degree card to view its campus demand chart.</p>

            {suggestions.length === 0 ? (
              <p>No direct Z-score matches found in this stream. Try adjusting Z-score or checking other streams.</p>
            ) : (
              <div className="suggestion-list">
                {suggestions.map((item, idx) => (
                  <div
                    key={`${item.university.id}-${item.degree.name}-${idx}`}
                    className={`suggestion-item ${item.isPreferred ? "preferred-highlight" : ""}`}
                    onClick={() => setSelectedChartDegree(item.degree.name)}
                  >
                    <div>
                      <div className="badge-row">
                        {item.isPreferred && <span className="badge pref">★ Preferred</span>}
                        <span className={`badge ${item.chance.replace(" ", "-").toLowerCase()}`}>
                          {item.chance}
                        </span>
                      </div>
                      <h4>{item.degree.icon} {item.degree.name}</h4>
                      <p className="uni-name">{item.university.emoji} {item.university.name} ({item.university.location})</p>
                      <small className="faculty-text">{item.degree.faculty} • {item.degree.duration}</small>
                    </div>

                    <div className="z-box">
                      <span>Est. Cutoff</span>
                      <strong>{item.adjustedCutoff}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LAST YEAR CAMPUS DEMAND CHART */}
          <div className="card">
            <div className="chart-header">
              <div>
                <h3>📊 Last Year Campus Demand</h3>
                {chartData.length > 0 && (
                  <p className="subtext">
                    Highest demand for <strong>{selectedChartDegree}</strong>:{" "}
                    <span className="top-uni">
                      🏆 {chartData[0].university} ({chartData[0].demandScore}%)
                    </span>
                  </p>
                )}
              </div>

              <select
                className="chart-select"
                value={selectedChartDegree}
                onChange={(e) => setSelectedChartDegree(e.target.value)}
              >
                {Object.keys(degreeCampusDemand).map((degName) => (
                  <option key={degName} value={degName}>{degName}</option>
                ))}
              </select>
            </div>

            <div className="bar-chart">
              {chartData.map((item, idx) => {
                const isHighest = idx === 0;
                return (
                  <div key={item.university} className="bar-row">
                    <div className="bar-label">
                      <span>{isHighest ? "🥇 " : ""}{item.university}</span>
                      <span className="bar-meta">Cutoff Z: <strong>{item.cutoffZ}</strong></span>
                    </div>
                    <div className="bar-track">
                      <div
                        className={`bar-fill ${isHighest ? "highest" : ""}`}
                        style={{ width: `${item.demandScore}%` }}
                      >
                        {item.demandScore}% Demand
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}