import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PieChartProps = {
  title: string;
  description?: string;
  innerData?: any[];
  outerData?: any[];
  innerKey?: string;
  outerKey?: string;
  nameKey?: string;
  height?: number;
};

function DashboardPieChart({
  title,
  description,
  innerData = [],
  outerData = [],
  innerKey = "value",
  outerKey = "value",
  nameKey = "name",
  height = 320,
}: PieChartProps) {
  return (
    <div className="dashboard-chart-card dashboard-chart-card-full">
      <div className="dashboard-chart-header">
        <h3 className="dashboard-chart-title">{title}</h3>
        {description && <p className="dashboard-chart-desc">{description}</p>}
      </div>

      <div className="dashboard-chart-body" style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ fontSize: 13, lineHeight: "24px" }}
            />
            {/* Level 1: Inner Pie */}
            <Pie
              data={innerData}
              dataKey={innerKey}
              nameKey={nameKey}
              cx="40%"
              cy="50%"
              outerRadius={65}
              fill="#2563eb"
            />
            {/* Level 2: Outer Pie */}
            <Pie
              data={outerData}
              dataKey={outerKey}
              nameKey={nameKey}
              cx="40%"
              cy="50%"
              innerRadius={75}
              outerRadius={105}
              fill="#38bdf8"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {innerData.length === 0 && outerData.length === 0 && (
        <div className="dashboard-chart-empty-hint">
          <span>Awaiting database data...</span>
        </div>
      )}
    </div>
  );
}

export default DashboardPieChart;
