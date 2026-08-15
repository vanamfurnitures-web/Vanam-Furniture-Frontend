import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import CartitemComponenet from "./CartitemComponenet";
// import CartitemComponenet from "./CartitemComponenet";

export default function CartContainer() {
  const navigate = useNavigate();
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [total, setTotal] = useState(0);

  const setiingTotal = (data) => {
    setTotal(data);
  };

  function cartShowing() {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }
return (
  <motion.div
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="
      fixed
      top-0
      right-0
      w-full
      md:w-[420px]
      h-screen
      bg-[#faf9f7]
      shadow-2xl
      flex
      flex-col
      z-[101]
      overflow-hidden
    "
  >

    {/* =====================================================
        HEADER
    ====================================================== */}
    <div
      className="
        relative
        w-full
        h-[90px]
        flex
        items-center
        px-6
        bg-[#1c1917]
        text-white
        shrink-0
      "
    >

      {/* Close button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={cartShowing}
        className="
          w-11
          h-11
          rounded-full
          flex
          items-center
          justify-center
          bg-white/10
          hover:bg-white/20
          transition-all
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>


      {/* Header title */}
      <div className="ml-4">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
          Your Selection
        </p>

        <p className="text-xl font-semibold mt-1">
          Shopping Cart
        </p>
      </div>


      {/* Item count */}
      {cartItems && cartItems.length > 0 && (
        <div className="ml-auto">
          <div
            className="
              min-w-[32px]
              h-8
              px-2
              rounded-full
              bg-amber-800
              flex
              items-center
              justify-center
              text-sm
              font-semibold
            "
          >
            {cartItems.length}
          </div>
        </div>
      )}

    </div>


    {/* =====================================================
        CART CONTENT
    ====================================================== */}
    {cartItems && cartItems.length > 0 ? (

      <div className="flex flex-col flex-1 min-h-0">

        {/* =================================================
            PRODUCTS
        ================================================== */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-5
            py-6
            space-y-3
            scrollbar-thin
            scrollbar-thumb-gray-300
            scrollbar-track-transparent
          "
        >

          {/* Small section heading */}
          <div className="flex items-center justify-between mb-4 px-1">

            <div>
              <p className="text-sm font-semibold text-gray-900">
                Cart Items
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Review your selected furniture
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {cartItems.length} item
              {cartItems.length !== 1 ? "s" : ""}
            </span>

          </div>


          {/* Cart items */}
          <div className="space-y-3">

            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-md
                    transition-shadow
                    duration-200
                    overflow-hidden
                  "
                >
                  <CartitemComponenet
                    item={item}
                    setiingTotal={setiingTotal}
                  />
                </div>
              ))}

          </div>

        </div>


        {/* =================================================
            SUMMARY
        ================================================== */}
        <div
          className="
            shrink-0
            bg-white
            border-t
            border-gray-200
            rounded-t-[28px]
            shadow-[0_-10px_35px_rgba(0,0,0,0.08)]
            px-6
            pt-6
            pb-6
          "
        >

          {/* Summary heading */}
          <div className="flex items-center justify-between mb-5">

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-800 font-medium">
                Order Summary
              </p>

              <p className="text-lg font-semibold text-gray-900 mt-1">
                Your Order
              </p>
            </div>

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-[#f5f1eb]
                flex
                items-center
                justify-center
                text-amber-900
              "
            >
              ₹
            </div>

          </div>


          {/* Price details */}
          <div className="space-y-4">

            {/* Subtotal */}
            <div className="flex items-center justify-between">

              <p className="text-sm text-gray-500">
                Sub Total
              </p>

              <p className="text-sm font-semibold text-gray-900">
                Rs {total}
              </p>

            </div>


            {/* Delivery */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Delivery
                </p>

                <p className="text-[11px] text-gray-400 mt-0.5">
                  Standard delivery
                </p>
              </div>

              <p className="text-sm font-semibold text-gray-900">
                Rs 77
              </p>

            </div>


            {/* Divider */}
            <div className="border-t border-dashed border-gray-300"></div>


            {/* Total */}
            <div className="flex items-end justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Total
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  Including delivery
                </p>
              </div>

              <p className="text-2xl font-bold text-gray-900">
                Rs {total + 77}
              </p>

            </div>

          </div>


          {/* =================================================
              BUTTONS
          ================================================== */}
          {!user ? (

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              className="
                w-full
                h-12
                mt-6
                rounded-full
                bg-amber-900
                text-white
                text-sm
                font-semibold
                tracking-wide
                shadow-md
                hover:bg-amber-800
                hover:shadow-lg
                transition-all
              "
            >
              Checkout
            </motion.button>

          ) : (

            <div className="flex gap-3 mt-6">

              {/* View Cart */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                className="
                  flex-1
                  h-12
                  rounded-full
                  border
                  border-gray-300
                  bg-white
                  text-gray-800
                  text-sm
                  font-semibold
                  hover:border-amber-800
                  hover:text-amber-800
                  hover:bg-[#faf9f7]
                  transition-all
                "
                onClick={() => {
                  navigate("/viewcart");
                }}
              >
                View Cart
              </motion.button>


              {/* Checkout */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                className="
                  flex-1
                  h-12
                  rounded-full
                  bg-amber-900
                  text-white
                  text-sm
                  font-semibold
                  tracking-wide
                  shadow-md
                  hover:bg-amber-800
                  hover:shadow-lg
                  transition-all
                "
              >
                Checkout
              </motion.button>

            </div>

          )}


          {/* Secure checkout */}
          <div className="flex items-center justify-center gap-2 mt-5">

            <div
              className="
                w-5
                h-5
                rounded-full
                bg-green-50
                flex
                items-center
                justify-center
              "
            >
              <span className="text-green-600 text-xs">
                ✓
              </span>
            </div>

            <p className="text-[11px] text-gray-500">
              Secure and trusted checkout
            </p>

          </div>

        </div>

      </div>

    ) : (

      /* =====================================================
          EMPTY CART
      ====================================================== */
      <div className="flex-1 flex flex-col items-center justify-center px-8">

        {/* Empty cart icon */}
        <div
          className="
            w-24
            h-24
            rounded-full
            bg-[#f5f1eb]
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-amber-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-9 4a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>
        </div>


        <p className="text-xl font-semibold text-gray-900">
          Your cart is empty
        </p>

        <p className="text-sm text-gray-500 text-center mt-2 max-w-[260px] leading-relaxed">
          Discover beautifully crafted furniture and add your favourites to your cart.
        </p>


        {/* Continue shopping */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={() => {
            cartShowing();
          }}
          className="
            mt-7
            px-7
            h-11
            rounded-full
            bg-amber-900
            text-white
            text-sm
            font-semibold
            shadow-md
            hover:bg-amber-800
            hover:shadow-lg
            transition-all
          "
        >
          Continue Shopping
        </motion.button>

      </div>

    )}

  </motion.div>
);
}