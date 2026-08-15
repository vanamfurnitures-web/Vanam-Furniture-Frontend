import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import Add_To_Cart from "../Shop/Add_To_Cart";

export default function ViewProduct({ visible, data, onClose }) {
  // for add to cart item
  const [quantity, setQuantity] = useState(1);
  const [{product, cartShow, cartItems, user }, dispatch] = useStateValue();
  const [updatedItem, setUpdatedItem] = useState([]);

  useEffect(() => {
    setUpdatedItem(cartItems);
  }, [cartItems]);

  const handleOnChange = (e) => {
    if (e.target.id === "cont" || e.target.id === "close") {
      onClose();
    }
  };

  const onChange = () => {};



  if (!visible) return null;
return (
  <div
    id="cont"
    onClick={handleOnChange}
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
  >
    {/* Modal */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
    >
      {/* Close Button */}
      <button
        id="close"
        type="button"
        onClick={handleOnChange}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-500 shadow-md transition hover:bg-gray-100 hover:text-gray-900"
        aria-label="Close"
      >
        ×
      </button>

      {/* Main Content */}
      <div className="grid min-h-0 grid-cols-1 overflow-y-auto lg:grid-cols-2">
        {/* ================= IMAGE SECTION ================= */}
        <div className="bg-gray-50 p-5 sm:p-8">
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src={data.image}
                alt={data.item_name}
                className="h-full w-full object-contain p-5 transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            {/* Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {/* Main image thumbnail */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-gray-900 bg-white p-1">
                <img
                  src={data.image}
                  alt={data.item_name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              {/* Gallery 1 */}
              {data.gal_1_imgURL && (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 transition hover:border-gray-500">
                  <img
                    src={data.gal_1_imgURL}
                    alt={`${data.item_name} gallery`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              )}

              {/* Gallery 2 */}
              {data.gal_2_imgURL && (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 transition hover:border-gray-500">
                  <img
                    src={data.gal_2_imgURL}
                    alt={`${data.item_name} gallery`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              )}

              {/* Gallery 3 */}
              {data.gal_3_imgURL && (
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 transition hover:border-gray-500">
                  <img
                    src={data.gal_3_imgURL}
                    alt={`${data.item_name} gallery`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= PRODUCT DETAILS ================= */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            {/* Category / Label */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Vanam Furniture
            </p>

            {/* Product Name */}
            <h1 className="mt-3 max-w-lg pr-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {data.item_name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-lg text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>

              <span className="text-sm text-gray-500">
                Ratings
              </span>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gray-200" />

            {/* Description */}
            <p className="max-w-xl text-base leading-7 text-gray-600">
              {data.short_descrip}
            </p>

            {/* Price */}
            <div className="mt-7">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹ {data.sale}
                </span>

                <span className="pb-1 text-lg text-gray-400 line-through">
                  ₹ {data.price}
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  data.quantity > 0
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <span
                className={`text-sm font-medium ${
                  data.quantity > 0
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {data.quantity > 0
                  ? `In stock · ${data.quantity} available`
                  : "Out of stock"}
              </span>
            </div>
          </div>

          {/* ================= CART SECTION ================= */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              Quantity
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Quantity Selector */}
              <div className="flex h-12 w-fit items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(quantity - 1)}
                  className="flex h-full w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                >
                  −
                </button>

                <div className="flex h-full min-w-12 items-center justify-center border-x border-gray-300 px-3 text-base font-semibold text-gray-900">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-full w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Add To Cart */}
              <div className="flex-1">
                <Add_To_Cart
                  data={data}
                  quantity={quantity}
                />
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleOnChange}
              className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}
