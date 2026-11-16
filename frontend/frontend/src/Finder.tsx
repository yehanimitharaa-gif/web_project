import { useState } from "react";
import type { FormEvent } from "react";
import { universities } from "./data";
import type { University, Degree } from "./data";
import { streams, districts, interestTags, programTitle } from "./demand";
import type { Stream } from "./demand";
import { suggest, topDemandCampus } from "./suggest";
import type { Profile, Suggestion } from "./suggest";
import DemandChart from "./DemandChart";
import "./Finder.css";

type Props = { onOpen: (uni: University, degree: Degree) => void };

const STORAGE_KEY = "unipath_profile";
const cities = Array.from(new Set(universities.map((u) => u.location)));

const loadProfile = (): Profile | null => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

function Finder({ onOpen }: Props) {
  const saved = loadProfile();

  // compulsory
  const [z, setZ] = useState(saved ? String(saved.zscore) : "");
  const [district, setDistrict] = useState(saved?.district ?? "");
  const [stream, setStream] = useState<Stream | "">(saved?.stream ?? "");
  // optional
  const [interests, setInterests] = useState<string[]>(saved?.interests ?? []);
  const [medium, setMedium] = useState(saved?.medium ?? "Any");
  const [location, setLocation] = useState(saved?.location ?? "Any");
  const [preferHigh, setPreferHigh] = useState(saved?.preferHighDemand ?? false);

  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(saved);
  const [results, setResults] = useState<Suggestion[] | null>(saved ? suggest(saved) : null);
  const [showAll, setShowAll] = useState(false);
  const [openChart, setOpenChart] = useState<string | null>(null);

  const toggleInterest = (t: string) =>
    setInterests((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const zNum = parseFloat(z);
    if (Number.isNaN(zNum) || zNum < -3 || zNum > 4) {
      setError("Enter a valid Z-score (for example 1.8532).");
      return;
    }
    if (!district) return setError("Select your district.");
    if (!stream) return setError("Select your A/L subject stream.");
    setError("");

    const p: Profile = {
      zscore: zNum,
      district,
      stream,
      interests,
      medium,
      location,
      preferHighDemand: preferHigh,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setProfile(p);
    setResults(suggest(p));
    setShowAll(false);
    setOpenChart(null);
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResults(null);
    setProfile(null);
    setZ("");
    setDistrict("");
    setStream("");
    setInterests([]);
    setMedium("Any");
    setLocation("Any");
    setPreferHigh(false);
  };

  const best = results ? (showAll ? results : results.slice(0, 5)) : [];

  return (
    <section>
      <div className="hero">
        <h2>🎯 Find my best degree programs</h2>
        <p>Enter your A/L details. We suggest degrees you can realistically get, matched to your interests.</p>
      </div>

      <form className="panel finder-form" onSubmit={submit}>
        <h3>1. Your A/L details <span className="req">required</span></h3>
        <div className="form-row">
          <label>
            Z-score
            <input
              type="number"
              step="0.0001"
              placeholder="e.g. 1.8532"
              value={z}
              onChange={(e) => setZ(e.target.value)}
            />
          </label>
          <label>
            District
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Select district</option>
              {districts.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
          <label>
            Subject stream
            <select value={stream} onChange={(e) => setStream(e.target.value as Stream)}>
              <option value="">Select stream</option>
              {streams.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
        </div>

        <h3>2. Your preferences <span className="opt">optional</span></h3>
        <p className="muted">What are you interested in?</p>
        <div className="chips">
          {interestTags.map((t) => (
            <button
              type="button"
              key={t}
              className={interests.includes(t) ? "chip active" : "chip"}
              onClick={() => toggleInterest(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="form-row">
          <label>
            Medium of instruction
            <select value={medium} onChange={(e) => setMedium(e.target.value)}>
              {["Any", "English", "Sinhala", "Tamil"].map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label>
            Preferred university city
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Any</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="check">
            <input type="checkbox" checked={preferHigh} onChange={(e) => setPreferHigh(e.target.checked)} />
            Prefer degrees with high job demand
          </label>
        </div>

        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="primary">Suggest degrees</button>
          {results && <button type="button" className="ghost" onClick={reset}>Clear</button>}
        </div>
      </form>

      {results && profile && (
        <div className="results">
          <h3>
            ✨ {results.length > 0 ? `Best matches for Z-score ${profile.zscore.toFixed(4)} · ${profile.district} · ${profile.stream}` : "No matches"}
          </h3>

          {results.length === 0 && (
            <div className="panel">
              <p>No degree matched your Z-score, district and stream in the current data. Check the Z-score or stream, or try again after more universities are added.</p>
            </div>
          )}

          {best.map((s, i) => {
            const key = s.uni.id + s.degree.name;
            const top = topDemandCampus(s.programId);
            return (
              <div key={key} className="suggestion">
                <div className="sg-rank">{i + 1}</div>
                <div className="sg-main">
                  <div className="sg-title">
                    <h4>{s.degree.icon} {s.degree.name}</h4>
                    <span className={"chance " + s.chance}>{s.chance}</span>
                  </div>
                  <p className="muted">{s.uni.name} · {s.uni.location} · {s.degree.duration} · {s.degree.medium}</p>

                  <div className="match">
                    <div className="match-bar"><div style={{ width: s.score + "%" }} /></div>
                    <span>{s.score}% match</span>
                  </div>

                  <ul className="reasons">
                    {s.reasons.map((r) => <li key={r}>{r}</li>)}
                  </ul>

                  <p className="sg-demand">
                    📊 Last year’s highest demand for {programTitle[s.programId]}: <strong>{top.campus}</strong> ({top.applicants.toLocaleString()} applicants)
                  </p>

                  <div className="form-actions">
                    <button className="ghost" onClick={() => setOpenChart(openChart === key ? null : key)}>
                      {openChart === key ? "Hide demand chart" : "📊 Demand by campus"}
                    </button>
                    <button className="primary small" onClick={() => onOpen(s.uni, s.degree)}>
                      Open degree ↗
                    </button>
                  </div>

                  {openChart === key && (
                    <DemandChart programId={s.programId} highlightUniId={s.uni.id} userZ={profile.zscore} />
                  )}
                </div>
              </div>
            );
          })}

          {results.length > 5 && (
            <button className="ghost" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show top 5 only" : `Show all ${results.length} matches`}
            </button>
          )}

          <p className="muted small-note">
            “Safe / Likely / Reach” compares your Z-score with last year’s district cut-off. Cut-offs change every year, so this is guidance, not a guarantee.
          </p>
        </div>
      )}
    </section>
  );
}

export default Finder;