import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { toast } from "react-toastify";
import axios from "axios";

export default function New_customers() {
  const [data, setData] = useState(null);

  const [{ user }] = useStateValue();

  async function gettingData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LINK}/auth/getalluser`
      );

      setData(
        response?.data?.product?.slice(0, 6) || []
      );
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.msg ||
          "Unable to load customers"
      );
    }
  }

  useEffect(() => {
    gettingData();
  }, []);

  if (!data) {
    return (
      <div className="space-y-4">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <div className="h-11 w-11 animate-pulse rounded-full bg-gray-200" />

            <div className="flex-1">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-2.5 w-36 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}

      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-gray-400">
          No customers found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {data.map((item) => {

        const firstLetter =
          item?.name?.charAt(0)?.toUpperCase() || "U";

        return (
          <div
            key={item?._id}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              p-2
              transition
              hover:bg-[#faf8f4]
            "
          >

            {/* Avatar */}
            {item?.image ? (
              <img
                src={item.image}
                alt={item?.name || "Customer"}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#efe8de] text-sm font-semibold text-amber-900">
                {firstLetter}
              </div>
            )}


            {/* Details */}
            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold text-gray-900">
                {item?.name || "Unknown"}
              </p>

              <p className="truncate text-xs text-gray-400">
                {item?.email || "No email"}
              </p>

            </div>


            {/* Purchases */}
            <div className="text-right">

              <p className="text-[10px] uppercase tracking-wide text-gray-400">
                Purchased
              </p>

              <p className="mt-1 text-sm font-semibold text-amber-900">
                {item?.purchased_product ?? 0}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
}