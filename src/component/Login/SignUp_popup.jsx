import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import Loader from "../Loader";

export default function SignUp_popup({
  onClosing_Signup_pop,
  login_from_signup_pop,
}) {
  const handleOnChange = (e) => {
    if (e.target.id === "cont" || e.target.id === "close") {
      onClosing_Signup_pop();
    }
  };

  const Login_pop = () => {
    login_from_signup_pop();
  };

  const [isLoader, setIsLoader] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
    picture: null,
  });

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const { name, lastname, email, password, confpassword, picture } = formData;
  console.log(formData);
  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // name: '',
  //   lastname: '',
  //   email: '',
  //   password: '',
  //   confpassword: '',

  async function handleSignup(e) {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confpassword
    ) {
      toast.error("Please provide all values");
    } else if (formData.password != formData.confpassword) {
      toast.error("Password is not matched");
    } else {

      try {
        setIsLoader(true);
        const response = await axios.post(
          `${import.meta.env.VITE_LINK}/auth/register`,
          formData
        );
        console.log(response);
        const { user, token } = response.data;
        console.log(user);
        console.log(token);
        dispatch({
          type: actionType.REGISTER_USER_SUCCESS,
          user: user,
          token: token,
        });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        onClosing_Signup_pop();
        toast.success("User Registered Successfully");
        setIsLoader(false);
      } catch (err) {
        const responseText = err.response.data;
        setIsLoader(false);
        console.log(responseText);
        toast.error(responseText.msg);
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        onClosing_Signup_pop();
        setIsLoader(false);
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const [seen, setSeen] = useState(false);
  const togglePop = () => {
    setSeen(!seen);
  };

return (
  <div
    id="cont"
    onClick={handleOnChange}
    className="
      fixed
      inset-0
      z-[200]
      flex
      items-center
      justify-center
      bg-black/50
      px-4
      py-5
      backdrop-blur-md
    "
  >
    {isLoader ? (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    ) : (
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-lg
          max-h-[92vh]
          overflow-y-auto
          overflow-x-hidden
          rounded-[2rem]
          border
          border-[#e8e1d8]
          bg-[#faf9f7]
          shadow-2xl
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="relative overflow-hidden bg-[#211c17] px-6 pb-8 pt-8 sm:px-8">

          {/* Decorative circles */}
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-700/20 blur-2xl" />
          <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-amber-400/10 blur-2xl" />

          {/* Close */}
          <button
            id="close"
            type="button"
            onClick={handleOnChange}
            className="
              absolute
              right-4
              top-4
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-lg
              text-white
              transition
              hover:bg-white/20
            "
          >
            ×
          </button>

          <div className="relative">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              Welcome to Vanam
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Create your account
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-300">
              Join Vanam Furnitures and discover pieces made to bring
              comfort and character into your home.
            </p>

          </div>
        </div>


        {/* =====================================================
            FORM
        ====================================================== */}
        <div className="px-6 py-7 sm:px-8">

          <form onSubmit={handleSignup}>

            {/* First Name / Last Name */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* First Name */}
              <div>
                <label
                  htmlFor="name"
                  className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-gray-500
                  "
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  autoComplete="given-name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-amber-800
                    focus:ring-2
                    focus:ring-amber-800/10
                  "
                />
              </div>


              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="
                    mb-2
                    block
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-gray-500
                  "
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  autoComplete="family-name"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-900
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-amber-800
                    focus:ring-2
                    focus:ring-amber-800/10
                  "
                />
              </div>

            </div>


            {/* Email */}
            <div className="mt-5">

              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-gray-500
                "
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  text-gray-900
                  outline-none
                  transition-all
                  placeholder:text-gray-400
                  focus:border-amber-800
                  focus:ring-2
                  focus:ring-amber-800/10
                "
              />

            </div>


            {/* Password */}
            <div className="mt-5">

              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-gray-500
                "
              >
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    pr-12
                    text-sm
                    text-gray-900
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-amber-800
                    focus:ring-2
                    focus:ring-amber-800/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prevState) => !prevState)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-8
                    w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    text-gray-400
                    transition
                    hover:bg-[#f3eee6]
                    hover:text-amber-900
                  "
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="text-lg" />
                  ) : (
                    <AiFillEye className="text-lg" />
                  )}
                </button>

              </div>
            </div>


            {/* Confirm Password */}
            <div className="mt-5">

              <label
                htmlFor="confpassword"
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-gray-500
                "
              >
                Confirm Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  id="confpassword"
                  value={confpassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    pr-12
                    text-sm
                    text-gray-900
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-amber-800
                    focus:ring-2
                    focus:ring-amber-800/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prevState) => !prevState)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    flex
                    h-8
                    w-8
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    text-gray-400
                    transition
                    hover:bg-[#f3eee6]
                    hover:text-amber-900
                  "
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="text-lg" />
                  ) : (
                    <AiFillEye className="text-lg" />
                  )}
                </button>

              </div>
            </div>


            {/* Account Links */}
            <div className="mt-6 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">

              <p className="text-gray-500">
                Already have an account?

                <button
                  type="button"
                  onClick={Login_pop}
                  className="
                    ml-1
                    font-semibold
                    text-amber-900
                    transition
                    hover:text-amber-700
                  "
                >
                  Login
                </button>
              </p>

              <button
                type="button"
                className="
                  w-fit
                  text-gray-500
                  transition
                  hover:text-amber-900
                "
              >
                Forgot Password?
              </button>

            </div>


            {/* Create Account */}
            <button
              type="submit"
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#211c17]
                px-5
                py-3.5
                text-sm
                font-semibold
                tracking-wide
                text-white
                shadow-md
                transition-all
                duration-200
                hover:bg-amber-900
                hover:shadow-lg
                active:scale-[0.99]
              "
            >
              Create Account
            </button>


            {/* Divider */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                or
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>


            {/* Login Prompt */}
            <div className="rounded-xl bg-[#f3eee6] px-4 py-3 text-center">

              <p className="text-xs leading-5 text-gray-500 sm:text-sm">
                Already part of the Vanam family?

                <button
                  type="button"
                  onClick={Login_pop}
                  className="
                    ml-1
                    font-semibold
                    text-amber-900
                    transition
                    hover:text-amber-700
                  "
                >
                  Sign in
                </button>
              </p>

            </div>

          </form>

        </div>

      </div>
    )}
  </div>
);
}
