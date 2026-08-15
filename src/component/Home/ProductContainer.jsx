import { motion } from "framer-motion";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlusFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { MdShoppingBasket } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import ViewProduct from "./ViewProduct";
import { MdFavorite } from "react-icons/md";
import { fetchFavorite } from "../../utils/fetchLocalStorageData";

export default function ProductContainer({ data, grid = "grid", updateDATA }) {
  let [{ product, user, cartItems, favorite_Items }, dispatch] = useStateValue();

  const rowContainer = useRef();
  const [flag, setFlag] = useState(false);
  const [view, setView] = useState(false);
  const [specific_data, setSpecific_data] = useState(null);
  const [gridORlist, setGridORlist] = useState(false);
  const navigate = useNavigate();

  console.log(product);

  const stopEventPropagationTry = (event) => {
    if (event.target != event.currentTarget) {
      event.stopPropagation();
    }
  };

  const viewProd = (item) => {
    setSpecific_data(item);
    setView(!view);
  };

  const handleOnClose = () => {
    setView(!view);
  };
  useEffect(() => {
    if (grid === "grid") {
      setGridORlist(true);
      console.log("grid");
    } else {
      setGridORlist(false);
      console.log("dkfjs");
    }
  }, [grid]);


  // add to favorite functionalities

  const [favoriteData, setFavoriteData] = useState(null);

  const favoriteDispatch = () => {
    dispatch({
      type: actionType.SET_FAVORITE_ITEMS,
      favorite_Items: favoriteData,
    });
  };

  const fevo = (item) => {
    favorite_Items.map((f) => {
      if (f.item_id === favoriteData.item_id) {
        // const num = parseFloat(f.purchase_quantity);
        f.favorite = !f.favorite;
        // console.log(f.purchase_quantity);
      }
    });
    console.log(favorite_Items);
    dispatch({
      type: actionType.SET_FAVORITE_ITEMS,
      favorite_Items: [...favorite_Items, favoriteData],
    });
    localStorage.removeItem("favorite_Items");
    localStorage.setItem(
      "favorite_Items",
      JSON.stringify([...favorite_Items, favoriteData])
    );
    findFavorite()
  };

  const addToExistedFevorite = () => {
    console.log("gsd");
    console.log(favorite_Items);

    favorite_Items.map((f) => {
      if (f.item_id === favoriteData.item_id) {
        // const num = parseFloat(f.purchase_quantity);
        f.favorite = !f.favorite;
        // console.log(f.purchase_quantity);
      }
    });
    console.log(favorite_Items);
    dispatch({
      type: actionType.SET_FAVORITE_ITEMS,
      favorite_Items: [...favorite_Items],
    });
    localStorage.removeItem("favorite_Items");
    localStorage.setItem("favorite_Items", JSON.stringify([...favorite_Items]));
    if(favorite_Items){

      findFavorite()
    }
    // cart();
  };

  const update_fevorite = () => {
    let check = true;
    if (Array.isArray(favorite_Items) && favoriteData) {
      favorite_Items.map((f) => {
        if (f.item_id === favoriteData.item_id) {
          console.log("hb");

          addToExistedFevorite();
          check = false;
        }
      });
      if (check) {
        console.log("hb");

        fevo();
      }
    }
  };
  

  const addtoFavorite = (item) => {
    console.log(item);
    setFavoriteData((prevCartData) => ({
      ...prevCartData,
      // item
      item_id: item._id,
      item_name: item.item_name,
      sale: item.sale,
      price: item.price,
      category: item.category,
      purchase_quantity: 1,
      cartORadd: "cart",
      SKU: item.SKU,
      picture: item.image,
      offer: item.offer,
      favorite:true,
    }));
    console.log(favoriteData)

    // let check = true;
    // if (Array.isArray(favorite_Items) && favorite_Items) {
    //   console.log("hb");
    //   favorite_Items.map((f) => {
    //     console.log(f);

    //     if (f && f.item_id === item.item_id) {
    //       console.log("hb");

    //       addToExistedFevorite();
    //       check = false;
    //     }
    //   });
    //   if (check) {
    //     console.log("hb");

    //     fevo();
    //   }
    // }

    // product.map((f) => {
    //   if (f._id === item._id) {
    //     // console.log(f.cartORadd);
    //     f.favorite = true;
    //     // console.log(f.cartORadd);
    //     return;
    //   }
    // });
    // localStorage.removeItem("favorite_Items");
    // localStorage.setItem("favorite_Items", JSON.stringify([...product]));
    // updateDATA();
    
  };

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const findFavorite = () => {
    favorite_Items=fetchFavorite()
    console.log(favorite_Items);

    if (Array.isArray(favorite_Items)) {data && 
      data.map((f) => {
        favorite_Items && favorite_Items.map((fav) => {
          if (f._id === fav.item_id) {
            f.favorite = fav.favorite;
          }
        });
      });
      forceUpdate();
    }
  };
  
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("favorite_Items")));
  }, [favoriteData]);
  


  useEffect(() => {
    // This code will run every time cartData changes
    console.log(favoriteData);
    console.log(favorite_Items);
    update_fevorite();
    findFavorite()
    if(favorite_Items === []){

      console.log("asdf");
    }
  }, [favoriteData]);

 

  

  console.log(data);



  // add to cart functionalities
  const [cartData, setCartData] = useState(null);

  const cartDispatch = () => {
    // localStorage.setItem("cartItems", JSON.string(updatedItem));
    // console.log("hjo");
    // localStorage.removeItem("cartItems");
    // localStorage.setItem("cartItems", JSON.stringify([...cartItems, cartData]))
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: cartData,
    });
  };

  const cart = (item) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...cartItems, cartData],
    });
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, cartData]));
    // cartItems.map((f) => {
    //   if (f.item_id === item._id) {
    //     const num = parseFloat(f.purchase_quantity);
    //     f.purchase_quantity = num + 1;
    //     flg = false;

    //   }

    // });
    // cartDispatch();
    // if (flg) {
    //   dispatch({
    //     type: actionType.SET_CART_ITEMS,
    //     cartItems: [...cartItems, cartData],
    //   });
    //   localStorage.setItem(
    //     "cartItems",
    //     JSON.stringify([...cartItems, cartData])
    //   );
    // }
  };

  const addToExistedCart = () => {
    console.log("gsd");
    cartItems.map((f) => {
      if (f.item_id === cartData.item_id) {
        const num = parseFloat(f.purchase_quantity);
        f.purchase_quantity = num + 1;
        console.log(f.purchase_quantity);
      }
    });
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...cartItems],
    });
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
    // cart();
  };
  console.log(cartItems);

  const update = () => {
    let check = true;
    if (cartItems && cartData) {
      cartItems.map((f) => {
        if (f.item_id === cartData.item_id) {
          addToExistedCart();
          check = false;
        }
      });
      if (check) {
        cart();
      }
      // localStorage.removeItem("cartItems");
      // localStorage.setItem("cartItems", JSON.stringify([...cartItems, cartData]));
    }
  };

  /**
   * The function `addToCart` adds an item to the cart and updates the quantity if the item is already
   * in the cart.
   */
  let flg = true;

  const addtoCart = (item) => {
    console.log(item);
    setCartData((prevCartData) => ({
      ...prevCartData,
      item_id: item._id,
      item_name: item.item_name,
      sale: item.sale,
      price: item.price,
      category: item.category,
      purchase_quantity: 1,
      cartORadd: "cart",
      SKU: item.SKU,
      picture: item.image,
      offer: item.offer,
    }));

    product.map((f) => {
      if (f._id === item._id) {
        console.log(f.cartORadd);
        f.cartORadd = "add";
        console.log(f.cartORadd);
        return;
      }
    });
    localStorage.removeItem("product");
    localStorage.setItem("product", JSON.stringify([...product]));
    // updateDATA();
    // if (item.cartORadd === "cart") {
    //   // cart(item)
    //   console.log(cartData);
    //   console.log("cart");
    //   item.cartORadd = "add";

    // } else if (item.cartORadd === "add") {
    //   console.log("add");
    //   // addToExistedCart(item)
    // }
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    // This code will run every time cartData changes
    console.log(cartData);
    update();
  }, [cartData]);

  console.log(data);

 return (
  <div className="text-gray-900 z-30 w-full">

    {/* =========================================================
        DESKTOP / TABLET VIEW
    ========================================================= */}
    <div
      ref={rowContainer}
      className={`w-full hidden md:flex items-stretch my-10 gap-6 md:gap-8 p-4 scroll-smooth ${
        flag
          ? "overflow-x-auto scrollbar-none scroll-auto"
          : "overflow-x-hidden flex-wrap justify-center"
      } ${gridORlist ? "" : "flex-col p-5"}`}
    >
      {data &&
        Array.isArray(data) &&
        data.map((item) => (
          <div
            key={item?.id}
            onClick={() => navigate(`/singleitem/${item?._id}`)}
            className={`group relative overflow-hidden cursor-pointer
              ${
                gridORlist
                  ? "w-full sm:w-[46%] lg:w-[30%] xl:w-[22%]"
                  : "w-full"
              }
              ${flag ? "min-w-[300px]" : "min-w-[260px]"}
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              hover:shadow-2xl
              hover:-translate-y-1
              transition-all duration-300 ease-out
            `}
          >

            {/* ================= IMAGE SECTION ================= */}
            <div className="relative w-full overflow-hidden bg-[#f5f3ef]">

              {/* Image */}
              <div
                className={`relative flex items-center justify-center w-full
                  ${gridORlist ? "h-[280px]" : "h-[300px]"}
                `}
              >
                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                  src={item?.image}
                  alt={item?.item_name || "Furniture"}
                  className="w-full h-full object-cover"
                />

                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
              </div>

              {/* ================= OFFER BADGE ================= */}
              {item.offer && (
                <div className="absolute top-4 left-4 z-20">
                  <div
                    className="
                      px-3 py-1.5
                      rounded-full
                      bg-red-600
                      text-white
                      text-xs
                      font-bold
                      tracking-wide
                      shadow-lg
                    "
                  >
                    {item.offer}
                  </div>
                </div>
              )}

              {/* ================= ACTION BUTTONS ================= */}
              <div
                className="
                  absolute
                  top-4
                  right-4
                  z-20
                  flex
                  flex-col
                  gap-2
                  opacity-0
                  translate-x-3
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  transition-all
                  duration-300
                "
              >

                {/* Favorite */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-full
                    bg-white/95
                    backdrop-blur-sm
                    shadow-md
                    text-xl
                    text-gray-700
                    hover:text-red-500
                    hover:bg-white
                    transition-all
                  "
                  onClick={(e) => {
                    stopEventPropagationTry(e);
                    addtoFavorite(item);
                  }}
                >
                  {item?.favorite === true ? (
                    <MdFavorite className="text-red-500" />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </motion.button>

                {/* View */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-full
                    bg-white/95
                    backdrop-blur-sm
                    shadow-md
                    text-xl
                    text-gray-700
                    hover:text-amber-700
                    hover:bg-white
                    transition-all
                  "
                  onClick={(e) => {
                    stopEventPropagationTry(e);
                    viewProd(item);
                  }}
                >
                  <IoEyeSharp />
                </motion.button>

                {/* Cart */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="
                    flex items-center justify-center
                    w-10 h-10
                    rounded-full
                    bg-amber-900
                    text-white
                    shadow-md
                    text-xl
                    hover:bg-amber-800
                    transition-all
                  "
                  onClick={(e) => {
                    stopEventPropagationTry(e);
                    addtoCart(item);
                  }}
                >
                  {item?.cartORadd === "cart" ? (
                    <MdShoppingBasket />
                  ) : (
                    <BsCartPlusFill />
                  )}
                </motion.button>
              </div>
            </div>

            {/* ================= PRODUCT DETAILS ================= */}
            <div
              className="
                relative
                p-5
                bg-white
              "
            >

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <span className="text-amber-500 text-sm">★★★★</span>
                  <span className="text-sm font-medium text-gray-700">
                    Ratings
                  </span>
                </div>
              </div>

              {/* Product name */}
              <p
                className="
                  text-lg
                  font-semibold
                  text-gray-900
                  leading-snug
                  truncate
                  group-hover:text-amber-800
                  transition-colors
                "
              >
                {item?.item_name}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-gray-100 my-4" />

              {/* Price + cart */}
              <div className="flex items-end justify-between gap-3">

                {/* Price */}
                <div className="flex flex-col">

                  {item?.sale ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          ${item?.price}
                        </span>

                        <span
                          className="
                            text-xl
                            font-bold
                            text-gray-900
                          "
                        >
                          ${item?.sale}
                        </span>
                      </div>

                      <span className="text-xs text-green-600 font-medium mt-1">
                        Special price
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-gray-900">
                      ${item?.price}
                    </span>
                  )}

                </div>

                {/* Cart button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="
                    flex
                    items-center
                    justify-center
                    w-11
                    h-11
                    rounded-full
                    bg-gray-900
                    text-white
                    shadow-md
                    hover:bg-amber-900
                    hover:shadow-lg
                    transition-all
                  "
                  onClick={(e) => {
                    stopEventPropagationTry(e);
                    addtoCart(item);
                  }}
                >
                  {item?.cartORadd === "cart" ? (
                    <MdShoppingBasket className="text-xl" />
                  ) : (
                    <BsCartPlusFill className="text-xl" />
                  )}
                </motion.button>

              </div>
            </div>
          </div>
        ))}

      {/* ================= VIEW PRODUCT MODAL ================= */}
      {view && specific_data ? (
        <ViewProduct
          onClose={handleOnClose}
          visible={view}
          data={specific_data}
        />
      ) : null}
    </div>


    {/* =========================================================
        MOBILE VIEW
    ========================================================= */}
    <div
      ref={rowContainer}
      className={`w-full flex md:hidden items-stretch my-12 gap-4 px-3 scroll-smooth ${
        flag
          ? "overflow-x-auto scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      } ${gridORlist ? "" : "flex-col"}`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            onClick={() => navigate(`/singlefood/${item?._id}`)}
            className={`
              group
              relative
              overflow-hidden
              cursor-pointer
              ${
                gridORlist
                  ? "w-[calc(50%-8px)]"
                  : "w-full"
              }
              ${flag ? "min-w-[165px]" : "min-w-[150px]"}
              bg-white
              rounded-2xl
              border border-gray-100
              shadow-sm
              hover:shadow-xl
              transition-all
              duration-300
            `}
          >

            {/* ================= MOBILE IMAGE ================= */}
            <div
              className="
                relative
                w-full
                h-40
                overflow-hidden
                bg-[#f5f3ef]
              "
            >

              <motion.img
                src={item?.image}
                alt={item?.item_name || "Furniture"}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* Offer */}
              {item.offer && (
                <div className="absolute top-3 left-3 z-20">
                  <span
                    className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-red-600
                      text-white
                      text-[10px]
                      font-bold
                      shadow-md
                    "
                  >
                    {item.offer}
                  </span>
                </div>
              )}

              {/* Favorite */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                className="
                  absolute
                  top-3
                  right-3
                  z-20
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
                  rounded-full
                  bg-white/95
                  shadow-md
                  text-lg
                  text-gray-700
                "
                onClick={(e) => {
                  stopEventPropagationTry(e);
                  addtoFavorite(item);
                }}
              >
                {item?.favorite === true ? (
                  <MdFavorite className="text-red-500" />
                ) : (
                  <AiOutlineHeart />
                )}
              </motion.button>
            </div>

            {/* ================= MOBILE DETAILS ================= */}
            <div className="p-3.5">

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1.5">
                <span className="text-amber-500 text-xs">★</span>
                <span className="text-[11px] text-gray-500">
                  ratings
                </span>
              </div>

              {/* Name */}
              <p
                className="
                  text-sm
                  font-semibold
                  text-gray-900
                  truncate
                "
              >
                {item?.item_name}
              </p>

              {/* Price + Cart */}
              <div className="flex items-center justify-between mt-3">

                <div>
                  {item?.sale ? (
                    <div className="flex flex-col">

                      <span className="text-[11px] text-gray-400 line-through">
                        ${item?.price}
                      </span>

                      <span className="text-base font-bold text-gray-900">
                        ${item?.sale}
                      </span>

                    </div>
                  ) : (
                    <span className="text-base font-bold text-gray-900">
                      ${item?.price}
                    </span>
                  )}
                </div>

                {/* Cart */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    bg-amber-900
                    text-white
                    shadow-md
                    hover:bg-amber-800
                    transition-all
                  "
                  onClick={(e) => {
                    stopEventPropagationTry(e);
                    addtoCart(item);
                  }}
                >
                  {item?.cartORadd === "cart" ? (
                    <MdShoppingBasket className="text-base" />
                  ) : (
                    <BsCartPlusFill className="text-base" />
                  )}
                </motion.button>

              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
);
}
