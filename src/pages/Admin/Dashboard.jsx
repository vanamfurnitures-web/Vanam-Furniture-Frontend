import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";

import Sidebar from "../../component/Admin_Comp/Sidebar/Sidebar";
import Box from "../../component/Admin_Comp/Dashboard/Box";
import OrderGraph from "../../component/Admin_Comp/Dashboard/OrderGraph";
import Seles_Report from "../../component/Admin_Comp/Dashboard/Seles_Report";
import New_order from "../../component/Admin_Comp/Dashboard/New_order";
import Top_Products from "../../component/Admin_Comp/Dashboard/Top_Products";
import New_customers from "../../component/Admin_Comp/Dashboard/New_customers";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900">

      <div className="flex min-h-screen w-full">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <main className="min-w-0 flex-1">

          {/* =====================================================
              HEADER
          ====================================================== */}
          <header className="border-b border-[#e5dfd6] bg-[#faf9f7]">

            <div className="mx-auto max-w-[1550px] px-5 py-6 sm:px-7 lg:px-10">

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
                    Administration
                  </p>

                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    Welcome Back
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Here's what's happening with your Vanam store today.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    bg-[#211c17]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-amber-900
                    hover:shadow-lg
                  "
                >
                  Manage Products
                  <FiArrowRight />
                </button>

              </div>

            </div>

          </header>


          {/* =====================================================
              DASHBOARD CONTENT
          ====================================================== */}
          <section className="mx-auto max-w-[1550px] px-5 py-6 sm:px-7 lg:px-10 lg:py-8">

            {/* =================================================
                KPI CARDS
            ================================================== */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <Box
                text="Total Balance"
                amount="60,900"
                data="11.4% less than last month"
                icon={<FiDollarSign />}
                trend="down"
              />

              <Box
                text="Total Spending"
                amount="1,200"
                data="8.2% less than last month"
                icon={<FiShoppingCart />}
                trend="down"
              />

              <Box
                text="Portfolio"
                amount="14,200"
                data="6.8% higher than last month"
                icon={<FiPackage />}
                trend="up"
              />

              <Box
                text="Customers"
                amount="3,239"
                data="12.4% higher than last month"
                icon={<FiUsers />}
                trend="up"
              />

            </div>


            {/* =================================================
                SALES OVERVIEW + ORDER STATUS
            ================================================== */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_0.8fr]">

              {/* Sales overview */}
              <section className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                      Performance
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                      Sales Overview
                    </h2>

                    <p className="mt-1 text-xs text-gray-400">
                      Sales activity across your main channels.
                    </p>

                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-semibold text-green-700">
                    +11.4%
                  </span>

                </div>

                <div className="mt-5 h-[280px] sm:h-[320px]">
                  <Seles_Report />
                </div>

              </section>


              {/* Order status */}
              <section className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm sm:p-6">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                    Orders
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Order Status
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    Current order distribution.
                  </p>

                </div>

                <div className="mt-3 h-[250px]">
                  <OrderGraph />
                </div>

                <div className="mt-2 grid grid-cols-2 gap-3">

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-800" />
                    Completed
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    Pending
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    Unpaid
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                    Delayed
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    Canceled
                  </div>

                </div>

              </section>

            </div>


            {/* =================================================
                RECENT ORDERS
            ================================================== */}
            <section className="mt-6 rounded-[1.5rem] border border-[#e5dfd6] bg-white shadow-sm">

              <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                    Activity
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Recent Orders
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/admin/orders")}
                  className="text-xs font-semibold text-amber-900 transition hover:text-amber-700"
                >
                  View All →
                </button>

              </div>

              <div className="overflow-x-auto">
                <New_order />
              </div>

            </section>


            {/* =================================================
                PRODUCTS + CUSTOMERS
            ================================================== */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">

              {/* Top Products */}
              <section className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                      Best Performers
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                      Top Products
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="text-xs font-semibold text-amber-900 hover:text-amber-700"
                  >
                    View All →
                  </button>

                </div>

                <div className="mt-5 space-y-3">
                  <Top_Products />
                </div>

              </section>


              {/* New Customers */}
              <section className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                      Customers
                    </p>

                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                      New Customers
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/users")}
                    className="text-xs font-semibold text-amber-900 hover:text-amber-700"
                  >
                    View All →
                  </button>

                </div>

                <div className="mt-5 space-y-4">
                  <New_customers />
                </div>

              </section>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}