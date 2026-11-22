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

export type BarConfig = {
  dataKey: string;
  fill: string;
  name?: string;
};

type BarChartProps = {
  title: string;
  description?: string;
  data?: any[];
  xKey?: string;
  barKey?: string;
  barColor?: string;
  bars?: BarConfig[];
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
  bars,
  height = 300,
  className = "",
}: BarChartProps) {
  const activeBars =
    bars && bars.length > 0
      ? bars
      : [{ dataKey: barKey, fill: barColor, name: barKey }];

  return (
    <div className={`dashboard-chart-card ${className}`.trim()}>
      <div className="dashboard-chart-header">
        <h3 className="dashboard-chart-title">{title}</h3>
        {description && <p className="dashboard-chart-desc">{description}</p>}
      </div>

      <div className="dashboard-chart-body" style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: "#64748b" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={45}
            />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value: any, name: any) => [value, name]}
              labelFormatter={(label: any, payload: any) => {
                const item = payload?.[0]?.payload;
                if (item?.courseName) {
                  return `${item.courseName}${
                    item.universityName ? " - " + item.universityName : ""
                  }`;
                }
                return label;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
            {activeBars.map((b) => (
              <Bar
                key={b.dataKey}
                dataKey={b.dataKey}
                fill={b.fill}
                name={b.name || b.dataKey}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.length === 0 && (
        <div className="dashboard-chart-empty-hint">
          <span>Loading data or no records available...</span>
        </div>
      )}
    </div>
  );
}

export default DashboardBarChart;
