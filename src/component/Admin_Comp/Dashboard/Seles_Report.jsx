import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    referral: 4000,
    direct: 2400,
    social: 2400,
  },
  {
    name: "Feb",
    referral: 3000,
    direct: 1398,
    social: 2210,
  },
  {
    name: "Mar",
    referral: 2000,
    direct: 4800,
    social: 2290,
  },
  {
    name: "Apr",
    referral: 2780,
    direct: 3908,
    social: 2000,
  },
  {
    name: "May",
    referral: 1890,
    direct: 4800,
    social: 2181,
  },
  {
    name: "Jun",
    referral: 2390,
    direct: 3800,
    social: 2500,
  },
  {
    name: "Jul",
    referral: 3490,
    direct: 4300,
    social: 2100,
  },
];

export default function Seles_Report() {
  return (
    <div className="h-full w-full">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 5,
            left: -20,
            bottom: 0,
          }}
        >

          <defs>

            <linearGradient
              id="salesReferral"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#92400e"
                stopOpacity={0.25}
              />

              <stop
                offset="95%"
                stopColor="#92400e"
                stopOpacity={0}
              />
            </linearGradient>

            <linearGradient
              id="salesDirect"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#22c55e"
                stopOpacity={0.18}
              />

              <stop
                offset="95%"
                stopColor="#22c55e"
                stopOpacity={0}
              />
            </linearGradient>

          </defs>


          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#eee8df"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#9ca3af",
              fontSize: 10,
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5dfd6",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          />

          <Area
            type="monotone"
            dataKey="referral"
            stroke="#92400e"
            strokeWidth={2}
            fill="url(#salesReferral)"
          />

          <Area
            type="monotone"
            dataKey="direct"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#salesDirect)"
          />

          <Area
            type="monotone"
            dataKey="social"
            stroke="#eab308"
            strokeWidth={2}
            fill="transparent"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}