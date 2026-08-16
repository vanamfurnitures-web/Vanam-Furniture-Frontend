import React from "react";
import { FiCheck } from "react-icons/fi";

export default function Toggle_button({
  enabled,
  toggle_Switch,
  id,
}) {
  function handleChange() {
    toggle_Switch(id);
  }

  
  return (
    <button
      type="button"
      onClick={handleChange}
      aria-pressed={enabled}
      className="group inline-flex items-center gap-2 focus:outline-none"
    >
      {/* Toggle */}
      <span
        className={`
          relative
          flex
          h-6
          w-11
          flex-shrink-0
          items-center
          rounded-full
          p-[3px]
          transition-all
          duration-300
          ${
            enabled
              ? "bg-amber-900"
              : "bg-gray-300"
          }
        `}
      >
        <span
          className={`
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-sm
            transition-all
            duration-300
            ${
              enabled
                ? "translate-x-5"
                : "translate-x-0"
            }
          `}
        >
          {enabled && (
            <FiCheck className="text-[10px] text-amber-900" />
          )}
        </span>
      </span>

      {/* Label */}
      <span
        className={`
          min-w-[70px]
          text-left
          text-[11px]
          font-semibold
          uppercase
          tracking-wide
          transition-colors
          duration-200
          ${
            enabled
              ? "text-amber-900"
              : "text-gray-400"
          }
        `}
      >
        {enabled ? "Featured" : "Inactive"}
      </span>
    </button>
  );
}