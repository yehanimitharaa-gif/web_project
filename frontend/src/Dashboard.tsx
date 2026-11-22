import { useState, useEffect, useMemo } from "react";
import DashboardStatCard from "./DashboardStatCard";
import DashboardBarChart from "./DashboardBarChart";
import "./Dashboard.css";

type Props = {
  user?: string | null;
  onNavigate?: (page: "dashboard" | "home" | "ranking" | "finder" | "hostel") => void;
};

type StatRecord = {
  id?: number;
  courseId: number;
  uniId: number;
  year: string;
  intake?: number;
  applications?: number;
  cutoff?: number;
  stream?: string;
  courseName?: string;
  courseCode?: string;
  universityName?: string;
  universityShortName?: string;
};

type CoupledChartItem = {
  name: string;
  courseId: number;
  uniId: number;
  courseName?: string;
  courseCode?: string;
  universityName?: string;
  universityShortName?: string;
  stream?: string;
  "2024/25": number;
  "2025/26": number;
};

/**
 * Transforms raw records into grouped couple-wise items for the bar chart.
 * Ensures data is ordered by courseId, and each couple has both 2024/25 and 2025/26.
 */
function transformCoupleData(
  records: StatRecord[],
  valueKey: "intake" | "cutoff" | "applications"
): CoupledChartItem[] {
  // 1. Order by courseId so same courseId stays together, then uniId and year
  const sorted = [...records].sort((a, b) => {
    if (a.courseId !== b.courseId) return a.courseId - b.courseId;
    if (a.uniId !== b.uniId) return a.uniId - b.uniId;
    return (a.year || "").localeCompare(b.year || "");
  });

  // 2. Group into couples
  const map = new Map<string, CoupledChartItem>();

  sorted.forEach((row) => {
    const key = `${row.courseId}_${row.uniId}`;
    if (!map.has(key)) {
      const uniShort = row.universityShortName || (row.uniId ? `U${row.uniId}` : "");
      const courseLabel = row.courseCode || (row.courseId ? `C${row.courseId}` : "Course");
      const label = uniShort ? `${courseLabel} (${uniShort})` : courseLabel;

      map.set(key, {
        name: label,
        courseId: row.courseId,
        uniId: row.uniId,
        courseName: row.courseName,
        courseCode: row.courseCode,
        universityName: row.universityName,
        universityShortName: row.universityShortName,
        stream: row.stream,
        "2024/25": 0,
        "2025/26": 0,
      });
    }

    const item = map.get(key)!;
    const val = Number(row[valueKey]) || 0;
    if (row.year === "2024/25" || row.year?.includes("24")) {
      item["2024/25"] = val;
    } else if (row.year === "2025/26" || row.year?.includes("25")) {
      item["2025/26"] = val;
    }
  });

  return Array.from(map.values());
}

const STREAMS = [
  "Mathematics",
  "Science",
  "Technology",
  "Commerce",
  "Arts",
];

function Dashboard({ onNavigate }: Props) {
  const [selectedStream, setSelectedStream] = useState<string>("Mathematics");
  const [statsData, setStatsData] = useState<{
    highestIntakes: StatRecord[];
    highestApplications: StatRecord[];
    highestCuttoff: StatRecord[];
  }>({
    highestIntakes: [],
    highestApplications: [],
    highestCuttoff: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatsData({
            highestIntakes: data.highestIntakes || data.data?.highestIntakes || [],
            highestApplications: data.highestApplications || data.data?.highestApplications || [],
            highestCuttoff: data.highestCuttoff || data.data?.highestCuttoff || [],
          });
        }
      })
      .catch((err) => {
        console.error("Error loading dashboard stats:", err);
      });
  }, []);

  const intakesChartData = useMemo(
    () => transformCoupleData(statsData.highestIntakes, "intake"),
    [statsData.highestIntakes]
  );

  const cutoffChartData = useMemo(
    () => transformCoupleData(statsData.highestCuttoff, "cutoff"),
    [statsData.highestCuttoff]
  );

  const applicationsChartData = useMemo(
    () => transformCoupleData(statsData.highestApplications, "applications"),
    [statsData.highestApplications]
  );

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
          {/* Chart 1: highestIntakes */}
          <DashboardBarChart
            title="Highest Course Intakes"
            description="Compares student intake volume between 2024/25 and 2025/26 for each course couple."
            data={intakesChartData}
            bars={[
              { dataKey: "2024/25", fill: "#2563eb", name: "2024/25" },
              { dataKey: "2025/26", fill: "#60a5fa", name: "2025/26" },
            ]}
          />

          {/* Chart 2: highestCuttoff */}
          <DashboardBarChart
            title="Highest Z-Score Cutoffs"
            description="Compares minimum entry Z-score cutoffs between 2024/25 and 2025/26 for each course couple."
            data={cutoffChartData}
            bars={[
              { dataKey: "2024/25", fill: "#8b5cf6", name: "2024/25" },
              { dataKey: "2025/26", fill: "#c084fc", name: "2025/26" },
            ]}
          />
        </div>

        {/* Chart 3: highestApplications (Bottom Row) */}
        <DashboardBarChart
          title="Highest Course Applications"
          description="Compares total student applications received between 2024/25 and 2025/26 for each course couple."
          data={applicationsChartData}
          bars={[
            { dataKey: "2024/25", fill: "#059669", name: "2024/25" },
            { dataKey: "2025/26", fill: "#34d399", name: "2025/26" },
          ]}
          height={320}
        />
      </div>
    </div>
  );
}

export default Dashboard;
