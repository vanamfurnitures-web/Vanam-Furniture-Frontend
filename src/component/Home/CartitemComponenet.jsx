import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import Add_To_Cart from "../Shop/Add_To_Cart";

export default function CartitemComponenet({
  item,
  id,
  setiingTotal,
  table = false,
  favorite = false,
}) {
  const [quantity, setQuantity] = useState(item.purchase_quantity);
  const [{ cartItems, favorite_Items }, dispatch] = useStateValue();

  const [isOpen, setIsOpen] = useState(true);
  const itemPrice = item?.sale !== "" && item?.sale != null
    ? item.sale
    : item?.price;
  const numericItemPrice = Number(itemPrice);
  const hasPrice = itemPrice !== "" && itemPrice != null && Number.isFinite(numericItemPrice);

  const cartDispatch = (updatedItem) => {
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(updatedItem));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: updatedItem,
    });
  };
  const favoriteDispatch = (updatedItem) => {
    localStorage.removeItem("favorite_Items");
    localStorage.setItem("favorite_Items", JSON.stringify(updatedItem));
    dispatch({
      type: actionType.SET_FAVORITE_ITEMS,
      favorite_Items: updatedItem,
    });
  };

  // cartItem update in database
  const updateQuantity = (type, id) => {
    let updatedItemCopy;
    if (favorite) {
      updatedItemCopy = [...favorite_Items]; // Create a copy of the favorite_Items array
    } else {
      updatedItemCopy = [...cartItems]; // Create a copy of the cartItems array
    }

    if (type === "add") {
      setQuantity(quantity + 1);
      updatedItemCopy = updatedItemCopy.map((f) =>
        f.item_id === id
          ? { ...f, purchase_quantity: f.purchase_quantity + 1 }
          : f
      );
    } else if (type === "minus") {
      if (item.purchase_quantity <= 1) {
        // Remove the item from the copy
        updatedItemCopy = updatedItemCopy.filter((item) => item.item_id !== id);
      } else {
        setQuantity(quantity - 1);
        updatedItemCopy = updatedItemCopy.map((f) =>
          f.item_id === id
            ? { ...f, purchase_quantity: f.purchase_quantity - 1 }
            : f
        );
      }
    } else if (type === "delete") {
      // Remove the item from the copy
      updatedItemCopy = updatedItemCopy.filter((item) => item.item_id !== id);
    }

    // Call cartDispatch with the updatedItemCopy
    if (favorite) {
      favoriteDispatch(updatedItemCopy);
    } else {
      cartDispatch(updatedItemCopy);
    }
  };

  useEffect(() => {
    // Calculate total price
    setQuantity(item.purchase_quantity);
    let totalpr = cartItems.reduce(
      (accum, cartItem) => {
        const price = cartItem?.sale !== "" && cartItem?.sale != null
          ? Number(cartItem.sale)
          : Number(cartItem?.price);
        return accum + (Number.isFinite(price) ? cartItem.purchase_quantity * price : 0);
      },
      0
    );
    setiingTotal(totalpr);
  }, [quantity, cartItems]);

  console.log(item);
return (
  <>
    {table ? (
      <tr
        key={item.id}
        className="bg-white hover:bg-[#faf9f7] transition-colors duration-200"
      >
        {/* ================= PRODUCT ================= */}
        <td className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">

            {/* Product Image */}
            <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-[#f5f1eb] border border-gray-100">
              <img
                className="w-full h-full object-cover"
                src={item?.picture}
                alt={item?.item_name || "Product"}
              />
            </div>

            {/* Product Information */}
            <div className="min-w-0">
              <p className="text-sm md:text-base font-semibold text-gray-900 truncate max-w-[220px]">
                {item?.item_name}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                ID: {item?.id}
              </p>

              <p className="text-xs text-amber-800 mt-2 font-medium">
                Furniture
              </p>
            </div>

          </div>
        </td>


        {/* ================= PRICE ================= */}
        <td className="px-6 py-5 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-800">
            {hasPrice ? `₹ ${itemPrice}` : "Price unavailable"}
          </p>
        </td>


        {/* ================= QUANTITY ================= */}
        <td className="px-6 py-5 border-b border-gray-100">

          <div
            className="
              inline-flex
              items-center
              gap-3
              px-2
              py-1.5
              rounded-full
              bg-[#f5f1eb]
              border
              border-gray-200
            "
          >

            {/* Minus */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              onClick={() =>
                updateQuantity("minus", item?.item_id)
              }
              className="
                w-7
                h-7
                rounded-full
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-white
                hover:text-amber-800
                transition-all
              "
            >
              <BiMinus />
            </motion.button>


            {/* Quantity */}
            <span
              className="
                min-w-[24px]
                text-center
                text-sm
                font-semibold
                text-gray-900
              "
            >
              {quantity}
            </span>


            {/* Plus */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              onClick={() =>
                updateQuantity("add", item?.item_id)
              }
              className="
                w-7
                h-7
                rounded-full
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-white
                hover:text-amber-800
                transition-all
              "
            >
              <BiPlus />
            </motion.button>

          </div>

        </td>


        {/* ================= TOTAL ================= */}
        <td className="px-6 py-5 border-b border-gray-100">

          <p className="text-sm font-semibold text-gray-900">
            {hasPrice
              ? `₹ ${numericItemPrice * item.purchase_quantity}`
              : "Price unavailable"}
          </p>

        </td>


        {/* ================= ACTIONS ================= */}
        <td className="px-6 py-5 border-b border-gray-100">

          <div className="flex items-center justify-center gap-3">

            {/* Delete */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              onClick={() =>
                updateQuantity("delete", item?.item_id)
              }
              onMouseEnter={() => setIsOpen(false)}
              onMouseLeave={() => setIsOpen(true)}
              className="
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                text-gray-500
                hover:text-red-600
                hover:bg-red-50
                transition-all
              "
            >
              <MdOutlineDeleteForever
                className={`transition-all duration-200 ${
                  isOpen ? "text-xl" : "text-2xl"
                }`}
              />
            </motion.button>


            {/* Add to cart */}
            {favorite && (
              <Add_To_Cart
                data={item}
                quantity={item.purchase_quantity}
              />
            )}

          </div>

        </td>

      </tr>
    ) : (

      /* =====================================================
         CART DRAWER ITEM
      ====================================================== */

      <div
        className="
          w-full
          bg-white
          rounded-2xl
          border
          border-gray-100
          overflow-hidden
          hover:shadow-sm
          transition-all
          duration-200
        "
      >

        <div className="flex items-center p-3 gap-3">

          {/* ================= IMAGE ================= */}
          <div
            className="
              w-[76px]
              h-[76px]
              flex-shrink-0
              rounded-xl
              overflow-hidden
              bg-[#f5f1eb]
            "
          >
            <img
              src={item.picture}
              className="w-full h-full object-cover"
              alt={item?.item_name || "Product"}
            />
          </div>


          {/* ================= PRODUCT INFO ================= */}
          <div className="flex-1 min-w-0">

            {/* Product name */}
            <p
              className="
                text-sm
                font-semibold
                text-gray-900
                truncate
                pr-2
              "
            >
              {item.item_name}
            </p>


            {/* Price */}
            <p className="text-sm font-semibold text-amber-900 mt-1">
              {hasPrice ? `₹ ${itemPrice}` : "Price unavailable"}
            </p>


            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-3">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-1
                  py-1
                  rounded-full
                  bg-[#f5f1eb]
                  border
                  border-gray-100
                "
              >

                {/* Minus */}
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={() =>
                    updateQuantity("minus", item?.item_id)
                  }
                  className="
                    w-6
                    h-6
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:bg-white
                    hover:text-amber-800
                    transition-all
                  "
                >
                  <BiMinus className="text-xs" />
                </motion.button>


                {/* Quantity */}
                <span
                  className="
                    min-w-[20px]
                    text-center
                    text-xs
                    font-semibold
                    text-gray-900
                  "
                >
                  {quantity}
                </span>


                {/* Plus */}
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={() =>
                    updateQuantity("add", item?.item_id)
                  }
                  className="
                    w-6
                    h-6
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:bg-white
                    hover:text-amber-800
                    transition-all
                  "
                >
                  <BiPlus className="text-xs" />
                </motion.button>

              </div>


              {/* Item total */}
              <p className="text-sm font-semibold text-gray-900">
                {hasPrice
                  ? `₹ ${numericItemPrice * item.purchase_quantity}`
                  : "Price unavailable"}
              </p>

            </div>

          </div>


          {/* ================= DELETE ================= */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            onClick={() =>
              updateQuantity("delete", item?.item_id)
            }
            onMouseEnter={() => setIsOpen(false)}
            onMouseLeave={() => setIsOpen(true)}
            className="
              self-start
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-gray-400
              hover:text-red-600
              hover:bg-red-50
              transition-all
              flex-shrink-0
            "
          >
            <MdOutlineDeleteForever
              className={`transition-all duration-200 ${
                isOpen ? "text-lg" : "text-xl"
              }`}
            />
          </motion.button>

        </div>

      </div>
    )}
  </>
);
}
