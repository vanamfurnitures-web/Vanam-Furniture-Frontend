import React, { useEffect, useState } from "react";
import { useStateValue } from "../../../context/StateProvider";

export default function Top_Products() {
  const [{ product }] = useStateValue();

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      product
        ? [...product]
            .sort(
              (a, b) =>
                (b?.purchasing_number || 0) -
                (a?.purchasing_number || 0)
            )
            .slice(0, 5)
        : []
    );
  }, [product]);

  if (!data.length) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-gray-400">
          No product data available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {data.map((item, index) => (
        <div
          key={item?._id}
          className="
            flex
            items-center
            gap-4
            rounded-xl
            border
            border-transparent
            p-3
            transition
            hover:border-[#e5dfd6]
            hover:bg-[#faf8f4]
          "
        >

          {/* Ranking */}
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f3eee6] text-[10px] font-bold text-amber-900">
            {index + 1}
          </div>


          {/* Image */}
          <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-[#f3eee6]">

            {item?.image ? (
              <img
                src={item.image}
                alt={item?.item_name || "Product"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                —
              </div>
            )}

          </div>


          {/* Details */}
          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-semibold text-gray-900">
              {item?.item_name || "Unnamed Product"}
            </p>

            <p className="mt-1 truncate text-xs text-gray-400">
              {item?.category || "Furniture"}
            </p>

          </div>


          {/* Sales */}
          <div className="text-right">

            <p className="text-sm font-semibold text-gray-900">
              {item?.sale !== "" && item?.sale != null
                ? `₹ ${item.sale}`
                : item?.price !== "" && item?.price != null
                  ? `₹ ${item.price}`
                  : "Price unavailable"}
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              {item?.purchasing_number ?? 0} sold
            </p>

          </div>

        </div>
      ))}

    </div>
  );
}