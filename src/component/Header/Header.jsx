import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineMail,
} from "react-icons/ai";
import {
  BsInstagram,
  BsTelephone,
  BsTwitter,
} from "react-icons/bs";
import {
  FaBars,
  FaTh,
  FaUserAlt,
} from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import {
  MdFavoriteBorder,
  MdShoppingBasket,
} from "react-icons/md";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import logo from "../../img/Vanam_funrniture_logo.jpeg";
import Login_popup from "../Login/Login_popup";
import SignUp_popup from "../Login/SignUp_popup";

export default function Header() {
  const [
    {
      cartShow,
      user,
      cartItems,
      favorite_Items,
    },
    dispatch,
  ] = useStateValue();

  const navigate = useNavigate();
  const location = useLocation();

  const favorite_Items_Length =
    favorite_Items?.filter((f) => f.favorite === true) || [];

  const [isFurnitureDropdownOpen, setFurnitureDropdownOpen] =
    useState(false);

  const [istoggleUserMenuOpen, setIstoggleUserMenuOpen] =
    useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [login_pop, setLogin_pop] = useState(false);
  const [signup_pop, setSignup_pop] = useState(false);


  /* =========================================================
      POPUP HANDLERS
  ========================================================= */

  const onClosing_log_pop = () => {
    setLogin_pop(false);
    setIstoggleUserMenuOpen(false);
  };

  const onClosing_Signup_pop = () => {
    setSignup_pop(false);
    setIstoggleUserMenuOpen(false);
  };

  const signUp_from_login_pop = () => {
    setLogin_pop(false);
    setSignup_pop(true);
  };

  const login_from_signup_pop = () => {
    setLogin_pop(true);
    setSignup_pop(false);
  };


  /* =========================================================
      DROPDOWN HANDLERS
  ========================================================= */

  const toggleFurnitureDropdown = () => {
    setFurnitureDropdownOpen(
      (prev) => !prev
    );
  };

  const toggleUserMenu = () => {
    setIstoggleUserMenuOpen(
      (prev) => !prev
    );
  };


  /* =========================================================
      MENU ITEMS
  ========================================================= */

  const DropmenuItem = [
    {
      path: "/shop",
      name: "Chair",
      icon: <FaTh />,
    },
    {
      path: "/shop",
      name: "Sofa",
      icon: <FaTh />,
    },
    {
      path: "/shop",
      name: "Table",
      icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "Bed",
      icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "Closet",
      icon: <FaUserAlt />,
    },
      {
      path: "/shop",
      name: "Kitchen",
      icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "3D Models/Miniatures",
      icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "Devghar",
      icon: <FaUserAlt />,
    },
  ]; 


  /* =========================================================
      USER MENU
  ========================================================= */

  const isAdmin = user?.email === "pish@gmail.com";

  const UserItem = [
    {
      path: "/account",
      name: "Profile",
    },

    ...(isAdmin
      ? [
          {
            path: "/admin/dashboard",
            name: "Admin Panel",
          },
        ]
      : []),

    {
      path: "/",
      name: "Log Out",
    },
  ];


  /* =========================================================
      ROUTE MATCH
  ========================================================= */

  function pathMatchRoute(route) {
    return route === location.pathname;
  }


  /* =========================================================
      SHOP CATEGORY
  ========================================================= */

  const shop_route = (e) => {
    const category =
      e.currentTarget.id;

    dispatch({
      type: actionType.SET_SHOP_CATEGORY,
      shop_category: category,
    });

    setFurnitureDropdownOpen(false);
    setIsOpen(false);
  };


  /* =========================================================
      LOGOUT
  ========================================================= */

  const userClick = (e) => {
    const clickedItem =
      e.currentTarget.id;

    if (clickedItem === "Log Out") {
      console.log("Logging out...");

      dispatch({
        type: actionType.LOG_OUT_USER,
        user: null,
        token: null,
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setIstoggleUserMenuOpen(false);
      setFurnitureDropdownOpen(false);
      setIsOpen(false);

      navigate("/");
    }
  };


  /* =========================================================
      CART
  ========================================================= */

  function cartShowing() {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }


  return (
    <header className="relative z-[100] w-full bg-[#faf9f7] border-b border-[#e8e1d8]">

      {/* =========================================================
          DESKTOP / TABLET
      ========================================================== */}
      <div className="hidden md:block">

        {/* ================= TOP BAR ================= */}
        <div className="border-b border-[#eee8df] bg-[#f4f0e9]">

          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 lg:px-10">

            {/* PHONE + EMAIL */}
            <div className="flex items-center gap-5">

              {/* Phone 1 */}
              <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                <BsTelephone className="text-amber-800" />
                <span>+91 9657764894</span>
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-gray-300" />

              {/* Phone 2 */}
              <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                <BsTelephone className="text-amber-800" />
                <span>+91 7020494920</span>
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-gray-300" />

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                <AiOutlineMail className="text-amber-800" />
                <span>vanamfurnitures@gmail.com </span>
              </div>

            </div>


            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 text-gray-400">

              <BsInstagram
                className="
                  cursor-pointer
                  text-sm
                  transition
                  hover:text-amber-800
                "
              />

              <AiFillFacebook
                className="
                  cursor-pointer
                  text-sm
                  transition
                  hover:text-amber-800
                "
              />

              <BsTwitter
                className="
                  cursor-pointer
                  text-sm
                  transition
                  hover:text-amber-800
                "
              />

              <AiFillYoutube
                className="
                  cursor-pointer
                  text-sm
                  transition
                  hover:text-amber-800
                "
              />

            </div>

          </div>
        </div>


        {/* ================= MAIN NAV ================= */}
        <div className="bg-[#faf9f7]">

          <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6 lg:px-10">

            {/* ================= LOGO ================= */}
            <div className="flex h-full w-[180px] flex-shrink-0 items-center">

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center"
              >
                <img
                  src={logo}
                  alt="Vanam Furnitures"
                  className="
                    block
                    h-[62px]
                    w-auto
                    max-w-[160px]
                    object-contain
                    cursor-pointer
                    transition-transform
                    duration-300
                    hover:scale-[1.02]
                  "
                />
              </button>

            </div>


            {/* ================= MAIN MENU ================= */}
            <nav className="flex h-full items-center">

              <ul className="flex h-full items-center gap-1">

                {/* HOME */}
                <li
                  onClick={() => navigate("/")}
                  className={`
                    relative
                    flex
                    h-full
                    cursor-pointer
                    items-center
                    px-5
                    text-[16px]
                    font-medium
                    whitespace-nowrap
                    transition-colors
                    duration-200
                    ${
                      pathMatchRoute("/")
                        ? "text-amber-900"
                        : "text-gray-600 hover:text-gray-950"
                    }
                  `}
                >
                  Home

                  {pathMatchRoute("/") && (
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-amber-800" />
                  )}
                </li>


                {/* ABOUT */}
                <li
                  onClick={() =>
                    navigate("/about")
                  }
                  className={`
                    relative
                    flex
                    h-full
                    cursor-pointer
                    items-center
                    px-5
                    text-[16px]
                    font-medium
                    whitespace-nowrap
                    transition-colors
                    duration-200
                    ${
                      pathMatchRoute("/about")
                        ? "text-amber-900"
                        : "text-gray-600 hover:text-gray-950"
                    }
                  `}
                >
                  About

                  {pathMatchRoute("/about") && (
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-amber-800" />
                  )}
                </li>


                {/* FURNITURE */}
                <li
                  className={`
                    relative
                    flex
                    h-full
                    cursor-pointer
                    items-center
                    px-5
                    text-[16px]
                    font-medium
                    whitespace-nowrap
                    transition-colors
                    duration-200
                    ${
                      pathMatchRoute("/shop")
                        ? "text-amber-900"
                        : "text-gray-600 hover:text-gray-950"
                    }
                  `}
                  onMouseEnter={() =>
                    setFurnitureDropdownOpen(true)
                  }
                  onMouseLeave={() =>
                    setFurnitureDropdownOpen(false)
                  }
                >

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/shop")
                    }
                    className="flex items-center gap-2"
                  >
                    Furniture

                    <span
                      className={`
                        text-xs
                        transition-transform
                        duration-200
                        ${
                          isFurnitureDropdownOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    >
                      ▾
                    </span>
                  </button>

                  {pathMatchRoute("/shop") && (
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-amber-800" />
                  )}


                  {/* Furniture Dropdown */}
                  <div
                    className={`
                      absolute
                      left-1/2
                      top-full
                      -translate-x-1/2
                      pt-3
                      transition-all
                      duration-200
                      ${
                        isFurnitureDropdownOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0 pointer-events-none"
                      }
                    `}
                  >

                    <div className="w-56 overflow-hidden rounded-2xl border border-[#e8e1d8] bg-white shadow-2xl">

                      <div className="border-b border-gray-100 bg-[#faf8f4] px-5 py-3">

                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-800">
                          Collections
                        </p>

                      </div>

                      {DropmenuItem.map(
                        (item, index) => (
                          <NavLink
                            key={index}
                            to={item.path}
                            id={item.name}
                            onClick={shop_route}
                            className="
                              flex
                              items-center
                              gap-3
                              px-5
                              py-3.5
                              text-[14px]
                              text-gray-600
                              transition
                              hover:bg-[#f7f3ed]
                              hover:text-amber-900
                            "
                          >

                            <span className="text-amber-800/70">
                              {item.icon}
                            </span>

                            <span>
                              {item.name}
                            </span>

                          </NavLink>
                        )
                      )}

                    </div>
                  </div>

                </li>


                {/* SHOWROOM */}
                <li
                  onClick={() =>
                    navigate("/showroom")
                  }
                  className={`
                    relative
                    flex
                    h-full
                    cursor-pointer
                    items-center
                    px-5
                    text-[16px]
                    font-medium
                    whitespace-nowrap
                    transition-colors
                    duration-200
                    ${
                      pathMatchRoute(
                        "/showroom"
                      )
                        ? "text-amber-900"
                        : "text-gray-600 hover:text-gray-950"
                    }
                  `}
                >
                  Showroom

                  {pathMatchRoute(
                    "/showroom"
                  ) && (
                    <span className="absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-amber-800" />
                  )}
                </li>

              </ul>
            </nav>


            {/* ================= RIGHT ACTIONS ================= */}
            <div className="flex w-[270px] flex-shrink-0 items-center justify-end gap-1">

              {/* Cart */}
              <button
                type="button"
                onClick={cartShowing}
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  text-gray-600
                  transition
                  hover:bg-[#f1ebe2]
                  hover:text-amber-900
                "
              >
                <GiShoppingCart className="text-[25px]" />

                {cartItems &&
                  cartItems.length > 0 && (
                    <span
                      className="
                        absolute
                        -right-0.5
                        -top-0.5
                        flex
                        min-h-[18px]
                        min-w-[18px]
                        items-center
                        justify-center
                        rounded-full
                        bg-amber-900
                        px-1
                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      {cartItems.length}
                    </span>
                  )}
              </button>


              {/* Favourite */}
              <button
                type="button"
                onClick={() =>
                  navigate("/favourite")
                }
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  text-gray-600
                  transition
                  hover:bg-[#f1ebe2]
                  hover:text-amber-900
                "
              >

                <MdFavoriteBorder className="text-[24px]" />

                {favorite_Items_Length.length >
                  0 && (
                  <span
                    className="
                      absolute
                      -right-0.5
                      -top-0.5
                      flex
                      min-h-[18px]
                      min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      bg-amber-900
                      px-1
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    {
                      favorite_Items_Length.length
                    }
                  </span>
                )}

              </button>


              <div className="mx-2 h-8 w-px bg-gray-200" />


              {/* ================= AUTH ================= */}
              {!user ? (

                <div className="flex items-center">

                  {/* Login */}
                  <button
                    type="button"
                    onClick={() =>
                      setLogin_pop(true)
                    }
                    className="
                      px-3
                      py-2.5
                      text-base
                      font-medium
                      text-gray-600
                      transition
                      hover:text-gray-950
                    "
                  >
                    Login
                  </button>

                  {/* Sign In */}
                  <button
                    type="button"
                    onClick={() =>
                      setSignup_pop(true)
                    }
                    className="
                      ml-2
                      min-w-[88px]
                      whitespace-nowrap
                      rounded-full
                      bg-[#211c17]
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      tracking-wide
                      text-white
                      transition-all
                      duration-200
                      hover:bg-amber-900
                      hover:shadow-lg
                    "
                  >
                    Sign In
                  </button>

                </div>

              ) : (

                /* ================= USER ================= */
                <div
                  className="relative"
                  onMouseEnter={() =>
                    setIstoggleUserMenuOpen(
                      true
                    )
                  }
                  onMouseLeave={() =>
                    setIstoggleUserMenuOpen(
                      false
                    )
                  }
                >

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-2.5
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-2.5
                      text-base
                      font-medium
                      text-gray-700
                      transition
                      hover:border-amber-800
                      hover:text-amber-900
                    "
                  >

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#efe8de] text-xs font-bold text-amber-900">
                      U
                    </span>

                    <span>User</span>

                    <span className="text-xs">
                      ▾
                    </span>

                  </button>


                  {/* User Dropdown */}
                  <div
                    className={`
                      absolute
                      right-0
                      top-full
                      pt-3
                      transition-all
                      duration-200
                      ${
                        istoggleUserMenuOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0 pointer-events-none"
                      }
                    `}
                  >

                    <div className="w-56 overflow-hidden rounded-2xl border border-[#e8e1d8] bg-white shadow-2xl">

                      <div className="border-b border-gray-100 bg-[#faf8f4] px-5 py-3">

                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-800">
                          Account
                        </p>

                      </div>


                      {UserItem.map(
                        (item, index) => (
                          <NavLink
                            key={index}
                            to={item.path}
                            id={item.name}
                            onClick={userClick}
                            className={`
                              block
                              px-5
                              py-3.5
                              text-[14px]
                              transition
                              ${
                                item.name ===
                                "Admin Panel"
                                  ? "bg-[#f7f1e8] font-semibold text-amber-900 hover:bg-amber-50"
                                  : "text-gray-600 hover:bg-[#f7f3ed] hover:text-amber-900"
                              }
                            `}
                          >

                            <div className="flex items-center justify-between">

                              <span>
                                {item.name}
                              </span>

                              {item.name ===
                                "Admin Panel" && (
                                <span className="rounded-full bg-amber-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                                  Admin
                                </span>
                              )}

                            </div>

                          </NavLink>
                        )
                      )}

                    </div>
                  </div>

                </div>

              )}

            </div>

          </div>

        </div>
      </div>


      {/* =========================================================
          MOBILE HEADER
      ========================================================== */}
      <div className="md:hidden">

        <div className="relative flex h-[72px] items-center justify-between px-5">

          {/* Menu */}
          <button
            type="button"
            onClick={() =>
              setIsOpen((prev) => !prev)
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-gray-600
              transition
              hover:bg-[#f1ebe2]
              hover:text-amber-900
            "
          >
            <FaBars className="text-xl" />
          </button>


          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              absolute
              left-1/2
              flex
              h-14
              w-[145px]
              -translate-x-1/2
              items-center
              justify-center
            "
          >
            <img
              src={logo}
              alt="Vanam Furnitures"
              className="
                h-12
                w-auto
                max-w-[135px]
                object-contain
              "
            />
          </button>


          {/* Mobile Cart */}
          <button
            type="button"
            onClick={cartShowing}
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-gray-600
              transition
              hover:bg-[#f1ebe2]
              hover:text-amber-900
            "
          >

            <MdShoppingBasket className="text-[25px]" />

            {cartItems &&
              cartItems.length > 0 && (
                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    min-h-[18px]
                    min-w-[18px]
                    items-center
                    justify-center
                    rounded-full
                    bg-amber-900
                    px-1
                    text-[10px]
                    font-bold
                    text-white
                  "
                >
                  {cartItems.length}
                </span>
              )}

          </button>

        </div>


        {/* =======================================================
            MOBILE MENU
        ======================================================== */}
        {isOpen && (
          <div className="border-t border-[#e8e1d8] bg-white shadow-xl">

            <div className="px-4 py-4">

              {/* Home */}
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-4
                  text-left
                  text-base
                  ${
                    pathMatchRoute("/")
                      ? "bg-[#f4eee5] font-semibold text-amber-900"
                      : "text-gray-600"
                  }
                `}
              >
                Home
              </button>


              {/* About */}
              <button
                type="button"
                onClick={() => {
                  navigate("/about");
                  setIsOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-4
                  text-left
                  text-base
                  ${
                    pathMatchRoute(
                      "/about"
                    )
                      ? "bg-[#f4eee5] font-semibold text-amber-900"
                      : "text-gray-600"
                  }
                `}
              >
                About
              </button>


              {/* Furniture */}
              <div>

                <button
                  type="button"
                  onClick={() =>
                    toggleFurnitureDropdown()
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-4
                    text-left
                    text-base
                    text-gray-600
                  "
                >

                  <span>
                    Furniture
                  </span>

                  <span
                    className={`
                      transition-transform
                      duration-200
                      ${
                        isFurnitureDropdownOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  >
                    ▾
                  </span>

                </button>


                {isFurnitureDropdownOpen && (
                  <div className="mb-2 ml-4 overflow-hidden rounded-xl border border-gray-100 bg-[#faf9f7]">

                    {DropmenuItem.map(
                      (item, index) => (
                        <NavLink
                          key={index}
                          to={item.path}
                          id={item.name}
                          onClick={(e) => {
                            shop_route(e);
                            setIsOpen(false);
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            px-5
                            py-3.5
                            text-sm
                            text-gray-600
                            transition
                            hover:bg-white
                            hover:text-amber-900
                          "
                        >

                          <span className="text-amber-800/70">
                            {item.icon}
                          </span>

                          {item.name}

                        </NavLink>
                      )
                    )}

                  </div>
                )}

              </div>


              {/* Showroom */}
              <button
                type="button"
                onClick={() => {
                  navigate("/showroom");
                  setIsOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-4
                  text-left
                  text-base
                  ${
                    pathMatchRoute(
                      "/showroom"
                    )
                      ? "bg-[#f4eee5] font-semibold text-amber-900"
                      : "text-gray-600"
                  }
                `}
              >
                Showroom
              </button>


              <div className="my-3 border-t border-gray-100" />


              {/* Mobile Auth */}
              {!user ? (

                <div className="flex items-center gap-3 px-2 pb-2">

                  <button
                    type="button"
                    onClick={() => {
                      setLogin_pop(true);
                      setIsOpen(false);
                    }}
                    className="
                      flex-1
                      rounded-full
                      border
                      border-gray-300
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSignup_pop(true);
                      setIsOpen(false);
                    }}
                    className="
                      flex-1
                      whitespace-nowrap
                      rounded-full
                      bg-gray-900
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Sign In
                  </button>

                </div>

              ) : (

                <div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleUserMenu()
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      px-4
                      py-4
                      text-base
                      text-gray-600
                    "
                  >

                    <span>User</span>

                    <span>
                      {istoggleUserMenuOpen
                        ? "−"
                        : "+"}
                    </span>

                  </button>


                  {istoggleUserMenuOpen && (
                    <div className="mb-2 ml-4 overflow-hidden rounded-xl border border-gray-100 bg-[#faf9f7]">

                      {UserItem.map(
                        (item, index) => (
                          <NavLink
                            key={index}
                            to={item.path}
                            id={item.name}
                            onClick={(e) => {
                              userClick(e);
                              setIsOpen(false);
                            }}
                            className={`
                              block
                              px-5
                              py-3.5
                              text-sm
                              transition
                              ${
                                item.name ===
                                "Admin Panel"
                                  ? "bg-[#f7f1e8] font-semibold text-amber-900"
                                  : "text-gray-600 hover:bg-white hover:text-amber-900"
                              }
                            `}
                          >

                            <div className="flex items-center justify-between">

                              <span>
                                {item.name}
                              </span>

                              {item.name ===
                                "Admin Panel" && (
                                <span className="rounded-full bg-amber-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                                  Admin
                                </span>
                              )}

                            </div>

                          </NavLink>
                        )
                      )}

                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {login_pop && (
        <Login_popup
          onClosing_log_pop={onClosing_log_pop}
          signUp_from_login_pop={signUp_from_login_pop}
        />
      )}

      {signup_pop && (
        <SignUp_popup
          onClosing_Signup_pop={onClosing_Signup_pop}
          login_from_signup_pop={login_from_signup_pop}
        />
      )}

    </header>
  );
}