import React from "react";

export default function Box({
  text,
  amount,
  data,
  icon,
  trend = "up",
}) {
  return (
    <div className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium text-gray-500">
            {text}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">
            ₹ {amount}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-lg text-amber-900">
          {icon}
        </div>

      </div>

      <div className="mt-4 flex items-center gap-2">

        <span
          className={`
            rounded-full
            px-2
            py-1
            text-[10px]
            font-semibold
            ${
              trend === "up"
                ? "bg-green-50 text-green-700"
                : "bg-amber-50 text-amber-700"
            }
          `}
        >
          {trend === "up" ? "↗ Growing" : "↘ Down"}
        </span>

        <span className="text-[11px] text-gray-400">
          {data}
        </span>

      </div>

    </div>
  );
}