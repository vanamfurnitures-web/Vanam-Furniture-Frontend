import React, { useState } from "react";
import {
  FaBars,
  FaCommentAlt,
  FaRegChartBar,
  FaShoppingBag,
  FaTh,
  FaUserAlt,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SidebarItem from "../../Admin_Comp/Sidebar/SidebarItem.jsx";
import { useStateValue } from "../../../context/StateProvider";
import { actionType } from "../../../context/reducer";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItem = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUserAlt />,
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: <FaShoppingBag />,
      childrens: [
        {
          path: "/admin/products",
          name: "Products",
          icon: <FaShoppingBag />,
        },
        {
          path: "/admin/products/addproducts",
          name: "Add Product",
          icon: <FaShoppingBag />,
        },
      ],
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: <FaRegChartBar />,
    },
    {
      path: "/admin/review",
      name: "Reviews",
      icon: <FaCommentAlt />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <BiLogOut />,
    },
  ];

  const handleLogout = () => {
    dispatch({
      type: actionType.LOG_OUT_USER,
      user: null,
      token: null,
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setIsOpen(false);
    navigate("/");
  };

  return (
    <aside
      className={`
        sticky
        top-0
        left-0
        z-[100]
        h-screen
        flex-shrink-0
        bg-[#1b1714]
        text-white
        shadow-xl
        transition-all
        duration-300
        ease-in-out
        ${isOpen ? "w-52" : "w-16"}
      `}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* =====================================================
          TOP
      ====================================================== */}
      <div className="flex h-20 items-center justify-center border-b border-white/10">

        <button
          type="button"
          onClick={toggle}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-gray-400
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-amber-300
          "
        >
          <FaBars className="text-lg" />
        </button>

      </div>


      {/* =====================================================
          MENU
      ====================================================== */}
      <div className="h-[calc(100vh-80px)] overflow-y-auto px-2 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        <div className="space-y-2">

          {menuItem.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              isOpen={isOpen}
              onLogout={handleLogout}
            />
          ))}

        </div>

      </div>
    </aside>
  );
}