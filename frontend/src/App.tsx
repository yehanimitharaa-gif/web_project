import { useState, useEffect } from "react";
import "./App.css";
import Chatbot from "./Chatbot";
import Login from "./Login";
import Hostel from "./Hostel";
import Finder from "./Finder";
import DemandChart from "./DemandChart";
import { universities, rankings } from "./data";
import type { University, Degree } from "./data";
import { programMeta } from "./Demand";

type Page = "home" | "ranking" | "finder" | "hostel";
type Tab = "about" | "registration" | "degrees";
type DegTab = "overview" | "modules" | "jobs" | "demand";

type NavState = {
  page: Page;
  selected: University | null;
  tab: Tab;
  degree: Degree | null;
  degTab: DegTab;
};

const demandPercent = { High: 90, Medium: 60, Low: 30 };

const savedZ = (): number | undefined => {
  try {
    const p = JSON.parse(localStorage.getItem("unipath_profile") || "null");
    return typeof p?.zscore === "number" ? p.zscore : undefined;
  } catch {
    return undefined;
  }
};

const getUniShortName = (uni: any): string => {
  if (uni.shortName) return uni.shortName;
  const name = uni.name.toLowerCase();
  if (name.includes("colombo")) return "UoC";
  if (name.includes("moratuwa")) return "UoM";
  if (name.includes("peradeniya")) return "UoP";
  if (name.includes("jayewardenepura")) return "USJ";
  if (name.includes("kelaniya")) return "UoK";
  if (name.includes("ruhuna")) return "UoR";
  if (name.includes("jaffna")) return "UoJ";
  return uni.id;
};

const logoBox = (size: number) => ({
  width: size,
  height: size,
  background: "#fff",
  borderRadius: 16,
  padding: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,.25)",
  flexShrink: 0,
});

function Logo({ uni, size }: { uni: University; size: number }) {
  return (
    <div style={logoBox(size)}>
      <img
        src={uni.logo}
        alt={uni.name + " logo"}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function Banner({ uni }: { uni: University }) {
  const style = uni.image
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35)),url(${uni.image})` }
    : { background: uni.color };
  return (
    <div className="banner" style={style}>
      {uni.logo ? <Logo uni={uni} size={90} /> : <span className="banner-emoji">{uni.emoji}</span>}
      <div>
        <h2>{uni.name}</h2>
        <p>📍 {uni.location}</p>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem("unipath_current"));
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<University | null>(null);
  const [tab, setTab] = useState<Tab>("about");
  const [degree, setDegree] = useState<Degree | null>(null);
  const [degTab, setDegTab] = useState<DegTab>("overview");

  const [history, setHistory] = useState<NavState[]>([]);

  const [dbDegrees, setDbDegrees] = useState<any[]>([]);
  const [loadingDegrees, setLoadingDegrees] = useState(false);

  const pushHistory = () => {
    setHistory((prev) => [...prev, { page, selected, tab, degree, degTab }]);
  };

  const handleGlobalBack = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    setPage(previousState.page);
    setSelected(previousState.selected);
    setTab(previousState.tab);
    setDegree(previousState.degree);
    setDegTab(previousState.degTab);
  };

  useEffect(() => {
    if (selected && tab === "degrees") {
      setLoadingDegrees(true);
      const shortName = getUniShortName(selected);
      fetch(`http://localhost:5000/api/courses/university/${shortName}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDbDegrees(data.data);
          } else {
            setDbDegrees([]);
          }
          setLoadingDegrees(false);
        })
        .catch((err) => {
          console.error("Error fetching university degrees:", err);
          setDbDegrees([]);
          setLoadingDegrees(false);
        });
    }
  }, [selected, tab]);

  const login = (name: string) => {
    localStorage.setItem("unipath_current", name);
    setUser(name);
  };

  const logout = () => {
    localStorage.removeItem("unipath_current");
    setUser(null);
    setSelected(null);
    setDegree(null);
    setHistory([]);
  };

  if (!user) return <Login onLogin={login} />;

  const filtered = universities.filter((u) =>
    (u.name + u.location).toLowerCase().includes(search.toLowerCase())
  );

  const navigateToPage = (targetPage: Page) => {
    if (page === targetPage && !selected && !degree) return;
    pushHistory();
    setSelected(null);
    setDegree(null);
    setPage(targetPage);
  };

  const openUni = (u: University) => {
    pushHistory();
    setSelected(u);
    setTab("about");
    setDegree(null);
    setDbDegrees([]);
  };

  const openDegree = (d: Degree) => {
    pushHistory();
    setDegree(d);
    setDegTab("overview");
  };

  const openFromFinder = (u: University, d: Degree) => {
    pushHistory();
    setPage("home");
    setSelected(u);
    setTab("degrees");
    setDegree(d);
    setDegTab("overview");
  };

  const programId = degree ? programMeta[degree.name]?.programId : undefined;

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={() => navigateToPage("home")} style={{ cursor: "pointer" }}>
          UniPath 🎓
        </h1>
        <nav>
          <button type="button" onClick={() => navigateToPage("home")}>Universities</button>
          <button type="button" onClick={() => navigateToPage("finder")}>🎯 Find my degree</button>
          <button type="button" onClick={() => navigateToPage("hostel")}>🏠 Hostels</button>
          <button type="button" onClick={() => navigateToPage("ranking")}>Rankings</button>
          <span className="user">👤 {user}</span>
          <button type="button" onClick={logout}>Logout</button>
        </nav>
      </header>

      <main className="main">
        {/* අනෙකුත් පිටු වලදී (Finder, Hostels වැනි) පෙන්වන Back බොත්තම */}
        {history.length > 0 && !selected && (
          <div style={{ marginBottom: "16px" }}>
            <button
              type="button"
              className="back"
              onClick={handleGlobalBack}
            >
              ← Back
            </button>
          </div>
        )}

        {page === "finder" && <Finder onOpen={openFromFinder} />}

        {page === "hostel" && <Hostel initialUniId={selected?.id} />}

        {page === "ranking" && (
          <section>
            <h2>🏆 University Rankings</h2>
            <p className="muted">Source: {rankings.source} | Year: {rankings.year}</p>
            <table>
              <thead>
                <tr><th>Rank</th><th>University</th></tr>
              </thead>
              <tbody>
                {rankings.list.map((r) => (
                  <tr key={r.rank}>
                    <td><span className="rank">{r.rank}</span></td>
                    <td>{r.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {page === "home" && !selected && (
          <section>
            <div className="hero">
              <h2>Hi {user}, choose your university 👋</h2>
              <p>Explore registration steps, degree programs and job opportunities.</p>
            </div>
            <input
              className="search"
              placeholder="🔍 Search university or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid">
              {filtered.map((u) => (
                <div key={u.id} className="card" onClick={() => openUni(u)}>
                  <div
                    className="card-img"
                    style={
                      u.logo
                        ? { background: u.color }
                        : u.image
                        ? { backgroundImage: `url(${u.image})` }
                        : { background: u.color }
                    }
                  >
                    {u.logo ? (
                      <Logo uni={u} size={110} />
                    ) : (
                      !u.image && <span>{u.emoji}</span>
                    )}
                  </div>
                  <div className="card-body">
                    <h3>{u.name}</h3>
                    <p className="muted">📍 {u.location}</p>
                    <p>{u.about}</p>
                    <span className="badge">Explore Degrees ↗</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <p>No universities found.</p>}
            </div>
          </section>
        )}

        {page === "home" && selected && (
          <section>
            {/* "All universities" සහ History Back බොත්තම එකම පේළියක දකුණු පැත්තෙන් */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="back"
                style={{ position: "relative", zIndex: 10, cursor: "pointer", margin: 0 }}
                onClick={() => { pushHistory(); setSelected(null); setDegree(null); }}
              >
                ← All universities
              </button>

              {history.length > 0 && (
                <button
                  type="button"
                  className="back"
                  style={{ position: "relative", zIndex: 10, cursor: "pointer", margin: 0 }}
                  onClick={handleGlobalBack}
                >
                  ← Back
                </button>
              )}
            </div>

            <Banner uni={selected} />

            <div className="tabs">
              {(["about", "registration", "degrees"] as Tab[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  className={tab === t ? "tab active" : "tab"}
                  onClick={() => { setTab(t); setDegree(null); }}
                >
                  {t === "about" ? "ℹ️ About" : t === "registration" ? "📝 Registration" : "📚 Degree Programs"}
                </button>
              ))}
            </div>

            {tab === "about" && (
              <div className="panel">
                <p>{selected.about}</p>
                <a href={selected.website} target="_blank" rel="noreferrer">Official website ↗</a>
              </div>
            )}

            {tab === "registration" && (
              <div className="panel">
                <h3>Registration process</h3>
                <ol>{selected.registration.process.map((s) => <li key={s}>{s}</li>)}</ol>
                <h3>Documents required</h3>
                <ul>{selected.registration.documents.map((d) => <li key={d}>{d}</li>)}</ul>
                <h3>Fees</h3>
                <p>{selected.registration.fees}</p>
                <h3>Dates</h3>
                <p>{selected.registration.dates}</p>
                <a href={selected.registration.officialLink} target="_blank" rel="noreferrer">
                  Official registration info ↗
                </a>
              </div>
            )}

            {tab === "degrees" && !degree && (
              <div>
                {loadingDegrees ? (
                  <p>Loading database degrees...</p>
                ) : dbDegrees.length > 0 ? (
                  <div className="grid">
                    {dbDegrees.map((d) => {
                      const mappedDeg: Degree = {
                        name: d.name,
                        duration: d.duration || "3 / 4 Years",
                        medium: d.medium || "English",
                        icon: "🎓",
                        faculty: d.faculty || "Faculty",
                        description: d.overview || `${d.name} offered by ${d.university}.`,
                        skills: ["Analytical Thinking", "Problem Solving", "Technical Expertise", "Research"],
                        modules: Array.isArray(d.yearContent) ? d.yearContent : [],
                        careers: d.jobMarket?.topRoles || [],
                        sectors: d.jobMarket?.topEmployers || [],
                        jobMarket: {
                          demand: (d.jobDemand === "Very High" || d.jobDemand === "High") ? "High" : "Medium",
                          notes: d.jobMarket?.averageSalary ? `Starting Salary: ${d.jobMarket.averageSalary}` : "Strong industry demand.",
                          outlook: "Excellent career growth and international opportunities."
                        }
                      } as Degree;

                      return (
                        <div key={d.code} className="card" onClick={() => openDegree(mappedDeg)}>
                          <div className="card-img small" style={{ background: selected.color }}>
                            <span>🎓</span>
                          </div>
                          <div className="card-body">
                            <h3>{d.name}</h3>
                            <p className="muted">{d.faculty}</p>
                            <p>{d.overview}</p>
                            <span className="badge">{d.duration}</span>
                            <span className="badge">{d.medium}</span>
                            <span className={"demand " + (d.jobDemand === "Very High" ? "High" : "Medium")}>{d.jobDemand} demand</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="panel">
                    <p>No degree programs found in the database for {selected.name} yet.</p>
                  </div>
                )}
              </div>
            )}

            {tab === "degrees" && degree && (
              <div className="panel">
                <button
                  type="button"
                  className="back"
                  style={{ position: "relative", zIndex: 10, cursor: "pointer" }}
                  onClick={() => { pushHistory(); setDegree(null); }}
                >
                  ← All degrees
                </button>
                <div className="deg-head" style={{ background: selected.color }}>
                  <span className="banner-emoji">{degree.icon}</span>
                  <div>
                    <h3>{degree.name}</h3>
                    <p>{degree.faculty} • {degree.duration} • {degree.medium}</p>
                  </div>
                </div>

                <div className="tabs">
                  {(["overview", "modules", "jobs", "demand"] as DegTab[]).map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={degTab === t ? "tab active" : "tab"}
                      onClick={() => setDegTab(t)}
                    >
                      {t === "overview"
                        ? "Overview"
                        : t === "modules"
                        ? "Course Content"
                        : t === "jobs"
                        ? "💼 Job Market"
                        : "📊 Campus Demand"}
                    </button>
                  ))}
                </div>

                {degTab === "overview" && (
                  <div>
                    <p>{degree.description}</p>
                    <h4>Skills you will build</h4>
                    {degree.skills?.map((s) => <span key={s} className="badge">{s}</span>)}
                  </div>
                )}

                {degTab === "modules" && (
                  <div className="years">
                    {degree.modules?.length > 0 ? (
                      degree.modules.map((m) => (
                        <div key={m.year} className="year">
                          <strong>{m.year}</strong>
                          <ul>{m.subjects.map((s) => <span key={s}>{s}</span>)}</ul>
                        </div>
                      ))
                    ) : (
                      <p className="muted">Year-by-year syllabus details will be updated soon.</p>
                    )}
                  </div>
                )}

                {degTab === "jobs" && (
                  <div>
                    <h4>Demand in the job market</h4>
                    <div className="meter">
                      <div
                        className={"meter-fill " + degree.jobMarket.demand}
                        style={{ width: demandPercent[degree.jobMarket.demand] + "%" }}
                      />
                    </div>
                    <p><span className={"demand " + degree.jobMarket.demand}>{degree.jobMarket.demand}</span> {degree.jobMarket.notes}</p>

                    <h4>Career paths</h4>
                    {degree.careers?.map((c) => <span key={c} className="badge">{c}</span>)}

                    <h4>Where you can work</h4>
                    {degree.sectors?.map((s) => <span key={s} className="badge green">{s}</span>)}

                    <h4>Future outlook</h4>
                    <p>{degree.jobMarket.outlook}</p>
                  </div>
                )}

                {degTab === "demand" && (
                  <div>
                    <h4>Which campus had the highest demand last year?</h4>
                    {programId ? (
                      <DemandChart programId={programId} highlightUniId={selected.id} userZ={savedZ()} />
                    ) : (
                      <p className="muted">No demand data for this degree yet.</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        Information may change yearly. Always confirm with UGC and the university.
      </footer>

      <Chatbot currentUni={selected} />
    </div>
  );
}

export default App;