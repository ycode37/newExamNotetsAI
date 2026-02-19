import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  LineChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const ChartSetup = ({ charts }) => {
  if (!charts || charts.length === 0) return null;

  // Monochromatic high-end color palette
  const COLORS = ["#000000", "#454545", "#808080", "#a9a9a9", "#d3d3d3"];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-black/10 p-3 rounded-lg shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">
            {label}
          </p>
          <p className="text-sm font-medium">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-20">
      {charts.map((chart, index) => (
        <div key={index} className="group">
          {/* Chart Header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-black/20 group-hover:text-black/40 transition-colors">
              Data Synthesis 0{index + 1}
            </span>
            <div className="h-[1px] flex-1 bg-black/[0.05]" />
            <h4 className="text-xs font-bold uppercase tracking-widest">
              {chart.title}
            </h4>
          </div>

          <div className="h-[350px] w-full px-4">
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === "bar" ? (
                <BarChart
                  data={chart.data}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#00000008"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af", fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f9fafb" }}
                    content={<CustomTooltip />}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {chart.data.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === 0 ? "#000" : "#00000030"}
                        className="hover:fill-black transition-all duration-300"
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : chart.type === "line" ? (
                <LineChart
                  data={chart.data}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#00000008"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#fff", stroke: "#000", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#000" }}
                  />
                </LineChart>
              ) : (
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    stroke="none"
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          <p className="mt-8 text-center text-[10px] text-black/20 italic font-serif">
            Analysis — Visualization of quantitative topic data.
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChartSetup;
