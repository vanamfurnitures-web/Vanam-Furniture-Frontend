import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function SidebarItem({
  item,
  isOpen,
  onLogout,
}) {
  const [open, setOpen] = useState(false);

  /* =====================================================
      PRODUCT / CHILD MENU
  ====================================================== */
  if (item.childrens) {
    return (
      <div className="w-full">

        {/* Parent item */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            px-2
            py-3
            text-left
            text-gray-400
            transition-all
            duration-200
            hover:bg-white/5
            hover:text-white
          "
        >

          <div className="flex min-w-0 items-center">

            {/* Icon */}
            <span
              className="
                flex
                h-10
                w-10
                flex-shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/5
                text-base
                text-gray-400
                transition-all
                duration-200
                group-hover:bg-amber-900/20
                group-hover:text-amber-300
              "
            >
              {item.icon}
            </span>

            {/* Text */}
            {isOpen && (
              <span className="ml-3 truncate text-sm font-medium">
                {item.name}
              </span>
            )}

          </div>


          {/* Arrow */}
          {isOpen && (
            <MdKeyboardArrowDown
              className={`
                flex-shrink-0
                text-xl
                text-gray-500
                transition-transform
                duration-200
                ${
                  open
                    ? "rotate-180 text-amber-300"
                    : ""
                }
              `}
            />
          )}

        </button>


        {/* =================================================
            CHILDREN
        ================================================== */}
        {isOpen && open && (
          <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-3">

            {item.childrens.map((child, index) => (
              <NavLink
                key={index}
                to={child.path}
                className={({ isActive }) => `
                  group
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  px-3
                  py-2.5
                  text-xs
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-amber-900/20 font-semibold text-amber-300"
                      : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                  }
                `}
              >
                <span className="text-[11px] text-gray-500 group-hover:text-amber-300">
                  {child.icon}
                </span>

                <span>
                  {child.name}
                </span>
              </NavLink>
            ))}

          </div>
        )}
      </div>
    );
  }


  /* =====================================================
      LOGOUT
  ====================================================== */
  if (item.name === "Logout") {
    return (
      <button
        type="button"
        onClick={onLogout}
        className="
          group
          flex
          w-full
          items-center
          rounded-xl
          px-2
          py-3
          text-left
          text-gray-400
          transition-all
          duration-200
          hover:bg-red-500/10
          hover:text-red-300
        "
      >
        <span
          className="
            flex
            h-10
            w-10
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white/5
            text-lg
            transition
            group-hover:bg-red-500/10
          "
        >
          {item.icon}
        </span>

        {isOpen && (
          <span className="ml-3 text-sm font-medium">
            Logout
          </span>
        )}
      </button>
    );
  }


  /* =====================================================
      NORMAL ITEM
  ====================================================== */
  return (
    <NavLink
      to={item.path}
      end
      className={({ isActive }) => `
        group
        flex
        w-full
        items-center
        rounded-xl
        px-2
        py-3
        transition-all
        duration-200
        ${
          isActive
            ? "bg-amber-900/20 text-amber-300 shadow-sm"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >

      <span
        className="
          flex
          h-10
          w-10
          flex-shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white/5
          text-base
          transition-all
          duration-200
          group-hover:bg-white/10
        "
      >
        {item.icon}
      </span>

      {isOpen && (
        <span className="ml-3 truncate text-sm font-medium">
          {item.name}
        </span>
      )}

    </NavLink>
  );
}