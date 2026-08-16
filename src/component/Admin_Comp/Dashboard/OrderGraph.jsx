import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 400,
  },
  {
    name: "Pending",
    value: 300,
  },
  {
    name: "Unpaid",
    value: 220,
  },
  {
    name: "Delayed",
    value: 180,
  },
  {
    name: "Canceled",
    value: 100,
  },
];

/*
  Keep chart colors intentionally simple:
  amber / green / yellow / orange / red
*/
const COLORS = [
  "#92400e",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
];

export default function OrderGraph() {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

      </PieChart>
    </ResponsiveContainer>
  );
}