import { useState } from "react";
import DashboardStatCard from "./DashboardStatCard";
import DashboardBarChart from "./DashboardBarChart";
import DashboardPieChart from "./DashboardPieChart";
import "./Dashboard.css";

type Props = {
  user?: string | null;
  onNavigate?: (page: "dashboard" | "home" | "ranking" | "finder" | "hostel") => void;
};

const STREAMS = [
  "Mathematics",
  "Science",
  "Technology",
  "Commerce",
  "Arts",
];

function Dashboard({ onNavigate }: Props) {
  const [selectedStream, setSelectedStream] = useState<string>("Mathematics");

  return (
    <div className="dashboard">
      {/* Top Hero Section */}
      <section className="dashboard-hero">
        <div className="dashboard-badges">
          <span className="dashboard-badge verified">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#2563eb"
              aria-hidden="true"
            >
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.75 4.5l-4-4 1.41-1.41L10.5 13.67l6.59-6.59 1.41 1.41-8 8z" />
            </svg>
            Academic Year 2023/2024 Cut-offs Loaded
          </span>

          <span className="dashboard-badge dataset">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0369a1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
            </svg>
            Official UGC Dataset
          </span>

          <span className="dashboard-badge pool">
            Sri Lanka Admissions Pool
          </span>
        </div>

        <h2 className="dashboard-title">
          Check which campuses &amp; degrees match your{" "}
          <span className="dashboard-highlight">A/L stream</span> and{" "}
          <span className="dashboard-highlight">Z-score</span>.
        </h2>

        <p className="dashboard-subtitle">
          Official entry cutoff predictors and admissions data synchronized with UGC University
          Admissions guidelines. Calculate quota viability, island ranking deviations, and district
          threshold margins.
        </p>

        <div className="dashboard-actions">
          <button
            type="button"
            className="dashboard-btn-primary"
            onClick={() => onNavigate?.("finder")}
          >
            Check My Eligibility
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <a
            href="https://www.ugc.ac.lk/index.php?option=com_content&view=article&id=20&Itemid=41&lang=en"
            target="_blank"
            rel="noreferrer"
            className="dashboard-btn-secondary"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download UGC Handbook PDF
          </a>
        </div>
      </section>

      {/* Target Stream Filter Bar */}
      <div className="dashboard-filter-bar">
        <div className="dashboard-stream-label">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2.5L7 11h10l-5-8.5z" />
            <rect x="3" y="15" width="6" height="6" rx="1" />
            <circle cx="17.5" cy="18" r="3" />
          </svg>
          <span>Target Stream:</span>
        </div>

        <div className="dashboard-select-wrapper">
          <select
            className="dashboard-stream-select"
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
          >
            {STREAMS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="dashboard-intake-badge">
          <span>Intake Year:</span> <strong>2023/2024</strong>
        </div>
      </div>

      {/* Three Stat Cards Horizontally */}
      <div className="dashboard-stat-grid">
        <DashboardStatCard />
        <DashboardStatCard />
        <DashboardStatCard />
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts-layout">
        {/* Top Row: Two Simple Bar Charts */}
        <div className="dashboard-charts-row">
          <DashboardBarChart
            title="University Intake Capacity by Stream"
            description="Compares the allocated student intake volume across universities for the selected stream."
            data={[]}
          />
          <DashboardBarChart
            title="Minimum Z-Score Cutoffs by District"
            description="Displays the minimum entry threshold z-scores required across districts."
            data={[]}
            barColor="#3b82f6"
          />
        </div>

        {/* Bottom Row: Two Level Pie Chart */}
        <DashboardPieChart
          title="Stream & Faculty Enrolment Distribution"
          description="Two-level proportional breakdown showing inner faculty clusters and outer degree programs."
          innerData={[]}
          outerData={[]}
        />
      </div>
    </div>
  );
}

export default Dashboard;
