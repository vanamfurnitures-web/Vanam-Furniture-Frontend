import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import CartitemComponenet from "../../component/Home/CartitemComponenet";

export default function ViewCart() {
  const navigate = useNavigate();
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const [total, setTotal] = useState(0);

  const setiingTotal = (data) => {
    setTotal(data);
  };

  console.log(cartItems);

let table = true;

return (
  <div className="min-h-screen w-full bg-[#faf9f7] text-gray-900 px-4 py-8 md:px-10 lg:px-20">

    {/* ================= PAGE HEADER ================= */}
    <div className="max-w-7xl mx-auto mb-8">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-800 font-medium mb-2">
        Your Selection
      </p>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
        Shopping Cart
      </h1>

      <div className="w-16 h-[2px] bg-amber-800 mt-4"></div>
    </div>


    {/* ================= MAIN CONTENT ================= */}
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">

      {/* =====================================================
          CART PRODUCTS
      ====================================================== */}
      <div className="w-full lg:w-[68%]">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Cart Header */}
          <div className="flex items-center justify-between px-5 md:px-7 py-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Cart Items
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Review your selected furniture before checkout
              </p>
            </div>

            <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full bg-[#f5f1eb] text-amber-900 text-sm font-medium">
              {cartItems?.length || 0} Items
            </div>
          </div>


          {/* ================= TABLE ================= */}
          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[720px]">

              <thead>
                <tr className="bg-[#faf9f7] border-b border-gray-100">

                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500">
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {cartItems &&
                  cartItems.map((item) => (
                    <CartitemComponenet
                      key={item.id}
                      item={item}
                      setiingTotal={setiingTotal}
                      table={table}
                    />
                  ))}

              </tbody>

            </table>

          </div>

          {/* Bottom cart area */}
          <div className="px-5 md:px-7 py-5 bg-[#faf9f7] border-t border-gray-100">

            <button
              type="button"
              onClick={() => {
                navigate("/viewcart");
              }}
              className="
                text-sm
                font-medium
                text-gray-700
                hover:text-amber-800
                transition-colors
                flex
                items-center
                gap-2
              "
            >
              <span className="text-lg">←</span>
              Continue Shopping
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          ORDER SUMMARY
      ====================================================== */}
      <div className="w-full lg:w-[32%] lg:sticky lg:top-6">

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* Summary Header */}
          <div className="px-6 md:px-7 py-6 bg-[#f5f1eb]">

            <p className="text-xs uppercase tracking-[0.2em] text-amber-800 font-medium">
              Order Summary
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
              Your Order
            </h2>

          </div>


          {/* Summary Content */}
          <div className="p-6 md:p-7">

            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-5">
              Estimate Shipping
            </p>

            <div className="w-full h-px bg-gray-200 mb-6"></div>


            {/* Sub Total */}
            <div className="flex items-center justify-between mb-5">

              <p className="text-gray-600 text-sm md:text-base">
                Sub Total
              </p>

              <p className="font-semibold text-gray-900">
                ₹ {total}
              </p>

            </div>


            {/* Delivery */}
            <div className="flex items-center justify-between mb-5">

              <div>
                <p className="text-gray-600 text-sm md:text-base">
                  Delivery
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Standard delivery
                </p>
              </div>

              <p className="font-semibold text-gray-900">
                ₹ 77
              </p>

            </div>


            {/* Divider */}
            <div className="w-full border-t border-dashed border-gray-300 my-6"></div>


            {/* Total */}
            <div className="flex items-end justify-between">

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">
                  Total
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Including delivery
                </p>
              </div>

              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                ₹ {total + 77}
              </p>

            </div>


            {/* =================================================
                CHECKOUT BUTTONS
            ================================================== */}

            {user ? (

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                className="
                  w-full
                  h-12
                  mt-8
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
                  duration-200
                "
              >
                Proceed to Checkout
              </motion.button>

            ) : (

              <div className="flex flex-col gap-3 mt-8">

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="
                    w-full
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
                    duration-200
                  "
                  onClick={() => {
                    navigate("/viewcart");
                  }}
                >
                  Continue Shopping
                </motion.button>


                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="
                    w-full
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
                    duration-200
                  "
                >
                  Checkout
                </motion.button>

              </div>

            )}


            {/* Secure checkout indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">

              <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                <span className="text-green-600 text-xs">
                  ✓
                </span>
              </div>

              <p className="text-xs text-gray-500">
                Secure and trusted checkout
              </p>

            </div>

          </div>

        </div>


        {/* Small reassurance card */}
        <div className="hidden lg:block mt-4 px-5 py-4 rounded-xl bg-[#f5f1eb] border border-[#ebe3d7]">

          <p className="text-sm font-medium text-gray-800">
            Crafted for your space
          </p>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Carefully selected furniture designed to bring comfort,
            character and timeless style to your home.
          </p>

        </div>

      </div>

    </div>

  </div>
);
}
