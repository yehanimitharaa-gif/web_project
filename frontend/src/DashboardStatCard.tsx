import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  category?: string;
  title?: string;
  subtitle?: string;
};

function DashboardStatCard({
  icon,
  category = "MOST SELECTED COURSE",
  title = "B.Sc. (Hons) in Computer Science & Engineering",
  subtitle = "Univ. of Moratuwa & Peradeniya",
}: Props) {
  return (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-icon-box">
        {icon ? (
          icon
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        )}
      </div>

      <div className="dashboard-stat-category">{category}</div>
      <h3 className="dashboard-stat-title">{title}</h3>
      <p className="dashboard-stat-subtitle">{subtitle}</p>
    </div>
  );
}

export default DashboardStatCard;
