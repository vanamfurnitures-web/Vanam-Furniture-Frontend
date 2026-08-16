import React, { useEffect, useState } from "react";
import Sidebar from "../../component/Admin_Comp/Sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiMail,
  FiPhone,
  FiShoppingBag,
  FiEdit2,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

export default function Users() {
  const [data, setData] = useState(null);

  async function gettingData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LINK}/auth/getalluser`
      );

      console.log(response.data.product);
      setData(response.data.product || []);
    } catch (err) {
      const responseText = err?.response?.data;

      console.log(responseText);

      toast.error(
        responseText?.msg || "Unable to fetch users"
      );

      console.log(err);
    }
  }

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900">

      {/* =====================================================
          ADMIN LAYOUT
      ====================================================== */}
      <div className="flex min-h-screen w-full">

        <Sidebar />

        <main className="min-w-0 flex-1">

          {/* =================================================
              PAGE HEADER
          ================================================== */}
          <header className="border-b border-[#e5dfd6] bg-[#faf9f7]">

            <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10">

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
                    Administration
                  </p>

                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    Users
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Manage and review registered Vanam customers.
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-2 rounded-full border border-[#e5dfd6] bg-white px-4 py-2.5 shadow-sm">
                    <FiUsers className="text-amber-800" />

                    <span className="text-sm font-semibold text-gray-800">
                      {data ? data.length : 0}
                    </span>

                    <span className="text-xs text-gray-500">
                      Users
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </header>


          {/* =================================================
              CONTENT
          ================================================== */}
          <section className="mx-auto max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10 lg:py-8">

            {/* =================================================
                SUMMARY CARD
            ================================================== */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-[#e5dfd6] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Total Users
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {data ? data.length : 0}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
                    <FiUsers />
                  </div>
                </div>
              </div>


              <div className="rounded-2xl border border-[#e5dfd6] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Customer Accounts
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {data ? data.length : 0}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
                    <FiShoppingBag />
                  </div>
                </div>
              </div>


              <div className="rounded-2xl border border-[#e5dfd6] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Active View
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      All
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
                    <FiUsers />
                  </div>
                </div>
              </div>

            </div>


            {/* =================================================
                TABLE CARD
            ================================================== */}
            <div className="overflow-hidden rounded-[1.75rem] border border-[#e5dfd6] bg-white shadow-sm">

              {/* Table header */}
              <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                    Customer Directory
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-gray-900">
                    Registered Users
                  </h2>
                </div>

                <p className="text-xs text-gray-400">
                  {data ? data.length : 0} records
                </p>

              </div>


              {/* Loading */}
              {!data ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-amber-800" />
                    <p className="mt-4 text-sm text-gray-500">
                      Loading users...
                    </p>
                  </div>
                </div>
              ) : data.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center px-5">
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3eee6] text-amber-900">
                      <FiUsers className="text-xl" />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      No users found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Registered customers will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">

                  <table className="min-w-[1050px] w-full">

                    <thead>
                      <tr className="border-b border-gray-100 bg-[#faf8f4]">

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Profile
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Name
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Contact
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Phone
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Total Buy
                        </th>

                        <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Actions
                        </th>

                      </tr>
                    </thead>


                    <tbody className="divide-y divide-gray-100">

                      {data.map((item) => (

                        <tr
                          key={item?._id || item?.id}
                          className="group transition-colors duration-200 hover:bg-[#fcfaf7]"
                        >

                          {/* Profile */}
                          <td className="px-6 py-5">

                            <div className="flex items-center">

                              {item?.image ? (
                                <img
                                  src={item.image}
                                  alt={item?.name || "User"}
                                  className="h-12 w-12 rounded-full border border-gray-200 object-cover shadow-sm"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efe8de] text-sm font-semibold text-amber-900">
                                  {item?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                              )}

                            </div>

                          </td>


                          {/* Name */}
                          <td className="px-6 py-5">

                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {item?.name || "Unknown User"}
                              </p>

                              {item?.lastname && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {item.lastname}
                                </p>
                              )}
                            </div>

                          </td>


                          {/* Email */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <FiMail className="text-gray-400" />

                              <span className="text-sm text-gray-600">
                                {item?.email || "—"}
                              </span>

                            </div>

                          </td>


                          {/* Phone */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <FiPhone className="text-gray-400" />

                              <span className="text-sm text-gray-600">
                                {item?.phone || "—"}
                              </span>

                            </div>

                          </td>


                          {/* Purchases */}
                          <td className="px-6 py-5">

                            <span className="inline-flex items-center rounded-full bg-[#f3eee6] px-3 py-1.5 text-xs font-semibold text-amber-900">
                              {item?.purchased_product ?? 0}
                            </span>

                          </td>


                          {/* Actions */}
                          <td className="px-6 py-5">

                            <div className="flex items-center justify-end gap-2">

                              <button
                                type="button"
                                onClick={() => {
                                  // Future edit functionality
                                }}
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-gray-200
                                  bg-white
                                  text-gray-500
                                  transition
                                  hover:border-amber-800
                                  hover:bg-[#f7f2eb]
                                  hover:text-amber-900
                                "
                                title="Edit user"
                              >
                                <FiEdit2 className="text-sm" />
                              </button>


                              <button
                                type="button"
                                onClick={() => {
                                  // Future delete functionality
                                }}
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-gray-200
                                  bg-white
                                  text-gray-500
                                  transition
                                  hover:border-red-200
                                  hover:bg-red-50
                                  hover:text-red-600
                                "
                                title="Delete user"
                              >
                                <FiTrash2 className="text-sm" />
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}