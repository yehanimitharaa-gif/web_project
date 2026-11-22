import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type BarChartProps = {
  title: string;
  description?: string;
  data?: any[];
  xKey?: string;
  barKey?: string;
  barColor?: string;
  height?: number;
  className?: string;
};

function DashboardBarChart({
  title,
  description,
  data = [],
  xKey = "name",
  barKey = "value",
  barColor = "#2563eb",
  height = 280,
  className = "",
}: BarChartProps) {
  return (
    <div className={`dashboard-chart-card ${className}`.trim()}>
      <div className="dashboard-chart-header">
        <h3 className="dashboard-chart-title">{title}</h3>
        {description && <p className="dashboard-chart-desc">{description}</p>}
      </div>

      <div className="dashboard-chart-body" style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
            <Bar dataKey={barKey} fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.length === 0 && (
        <div className="dashboard-chart-empty-hint">
          <span>Awaiting database data...</span>
        </div>
      )}
    </div>
  );
}

export default DashboardBarChart;
