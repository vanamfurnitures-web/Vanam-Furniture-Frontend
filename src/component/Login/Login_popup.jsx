import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider';
import axios from 'axios';
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { actionType } from '../../context/reducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

export default function Login_popup({onClosing_log_pop,signUp_from_login_pop}) {

    const handleOnChange = (e) => {
        if (e.target.id === "cont" || e.target.id === "close") {
            onClosing_log_pop();
        }
      };
    const Signup_pop = () => {
        signUp_from_login_pop();
        
      };
      const [isLoader,setIsLoader] = useState(false)
      const [showPassword, setShowPassword] = useState(false);
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const [{user}, dispatch] = useStateValue();
    
      const { email, password } = formData;
      // this function did not work it cant save state data and show it in dev
      function onChange(e) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      }


      async function handleLogin(e) {
        e.preventDefault();
        // Code to handle login goes here
        console.log("login")
        console.log(formData);
        setIsLoader(true)
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_LINK}/auth/login`,
            formData
          );
          console.log(response);
          const { user, token } = response.data;
          console.log(user);
          console.log(token);
          dispatch({
            type: actionType.LOGIN_USER_SUCCESS,
            user: user,
            token: token,
          });
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", (token));
          onClosing_log_pop();
          setIsLoader(false)
        } catch (err) {
          const responseText = err.response.data;
    
          console.log(responseText);
          toast.error(responseText.msg);
          console.log(err);
          setIsLoader(false)
        }
      }

      useEffect(()=> {
        if(user) {
          setTimeout(() => {
            // navigate('/')
            
            setIsLoader(false)
          },3000)
        }
      },[user])




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
      py-6
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
          max-w-md
          overflow-hidden
          rounded-[2rem]
          border
          border-[#e8e1d8]
          bg-[#faf9f7]
          shadow-2xl
        "
      >

        {/* =====================================================
            TOP DECORATIVE AREA
        ====================================================== */}
        <div className="relative overflow-hidden bg-[#211c17] px-6 pb-10 pt-8">

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
              Welcome back
            </p>

            <h2 className="mt-2 text-3xl font-semibold text-white">
              Login to Vanam
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-300">
              Continue exploring furniture made to bring comfort and character
              into your home.
            </p>

          </div>

        </div>


        {/* =====================================================
            FORM
        ====================================================== */}
        <div className="px-6 py-7 sm:px-8">

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-6">

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
                onChange={onChange}
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
            <div className="mb-5">

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
                  onChange={onChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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


            {/* Links */}
            <div className="mb-7 flex items-center justify-between gap-3 text-xs sm:text-sm">

              <p className="text-gray-500">
                Don't have an account?
                <button
                  type="button"
                  onClick={Signup_pop}
                  className="
                    ml-1
                    font-semibold
                    text-amber-900
                    transition
                    hover:text-amber-700
                  "
                >
                  Register
                </button>
              </p>

              <button
                type="button"
                className="
                  whitespace-nowrap
                  text-gray-500
                  transition
                  hover:text-amber-900
                "
              >
                Forgot Password?
              </button>

            </div>


            {/* Login Button */}
            <button
              type="submit"
              className="
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
              Login
            </button>


            {/* Divider */}
            <div className="my-6 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                or
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>


            {/* Secondary message */}
            <div className="rounded-xl bg-[#f3eee6] px-4 py-3 text-center">

              <p className="text-xs leading-5 text-gray-500">
                New to Vanam Furnitures?
                <button
                  type="button"
                  onClick={Signup_pop}
                  className="ml-1 font-semibold text-amber-900"
                >
                  Create an account
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
