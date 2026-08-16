import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const orders = [
  {
    id: "8987",
    product: "Elegant-09",
    units: 7,
    date: "08 Oct 2023",
    cost: "₹ 897",
    status: "Completed",
  },
  {
    id: "6209",
    product: "Fortune-3",
    units: 2,
    date: "07 Oct 2023",
    cost: "₹ 453",
    status: "Completed",
  },
  {
    id: "1087",
    product: "Table-2",
    units: 1,
    date: "07 Oct 2023",
    cost: "₹ 297",
    status: "Delayed",
  },
  {
    id: "8009",
    product: "Golden-20",
    units: 2,
    date: "07 Oct 2023",
    cost: "₹ 597",
    status: "On Hold",
  },
  {
    id: "3349",
    product: "FT-09",
    units: 3,
    date: "06 Oct 2023",
    cost: "₹ 530",
    status: "Canceled",
  },
];

function statusClass(status) {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-700";

    case "Delayed":
      return "bg-blue-50 text-blue-700";

    case "On Hold":
      return "bg-yellow-50 text-yellow-700";

    case "Canceled":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-50 text-gray-600";
  }
}

export default function New_order() {
  return (
    <table className="min-w-[850px] w-full">

      <thead>

        <tr className="border-b border-gray-100 bg-[#faf8f4]">

          <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Order
          </th>

          <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Product
          </th>

          <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Units
          </th>

          <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Date
          </th>

          <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Cost
          </th>

          <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Status
          </th>

          <th className="px-5 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            
          </th>

        </tr>

      </thead>

      <tbody className="divide-y divide-gray-100">

        {orders.map((order) => (
          <tr
            key={order.id}
            className="transition hover:bg-[#fcfaf7]"
          >

            <td className="px-5 py-4">
              <span className="text-sm font-semibold text-gray-900">
                #{order.id}
              </span>
            </td>

            <td className="px-5 py-4">
              <span className="text-sm text-gray-700">
                {order.product}
              </span>
            </td>

            <td className="px-5 py-4">
              <span className="text-sm text-gray-600">
                {order.units}
              </span>
            </td>

            <td className="px-5 py-4">
              <span className="text-sm text-gray-500">
                {order.date}
              </span>
            </td>

            <td className="px-5 py-4">
              <span className="text-sm font-semibold text-gray-900">
                {order.cost}
              </span>
            </td>

            <td className="px-5 py-4">

              <span
                className={`
                  inline-flex
                  rounded-full
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  ${statusClass(order.status)}
                `}
              >
                {order.status}
              </span>

            </td>

            <td className="px-5 py-4 text-right">

              <button
                type="button"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                <FiMoreHorizontal />
              </button>

            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}