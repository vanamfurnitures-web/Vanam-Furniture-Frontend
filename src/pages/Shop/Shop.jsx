import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import Slider from "react-slider";
import { BsFillGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import ProductContainer from "../../component/Home/ProductContainer";
import { useEffect } from "react";

export default function Shop() {
  const [{ product, user, shop_category }, dispatch] = useStateValue();
  console.log(product);
  const min = 0;
  const max = 100000;
  const [activeCatagory, setActiveCategory] = useState(shop_category);
  const [price, setPrice] = useState(max);
  const [gridORlist, setGridOrlist] = useState("grid");
  const [sortValue, setSortValue] = useState(null);
  const [data, setData] = useState(product);
  const [length, setLength] = useState(max);

  const CategoryItem = [
    {
      path: "/shop",
      name: "Chair",
      // icon: <FaTh />,
    },
    {
      path: "/shop",
      name: "Sofa",
      // icon: <FaTh />,
    },
    {
      path: "/shop",
      name: "Table",
      // icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "Bed",
      // icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "Closet",
      // icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "Kitchen",
      // icon: <FaUserAlt />,
    },
    {
      path: "/shop",
      name: "3D Models/Miniatures",
      // icon: <FaUserAlt />,
    },
  ];

  const sortBY = (e) => {
    console.log(e.target.value);
    setSortValue(e.target.id)
    let sortedCopy = [...data];
    if (e.target.value === "a-z") {
      sortedCopy = sortedCopy.sort((a, b) =>
        a.item_name.localeCompare(b.item_name)
      );
    }
    if (e.target.value === "z-a") {
      sortedCopy = sortedCopy.sort((a, b) =>
        b.item_name.localeCompare(a.item_name)
      );
    }
    if (e.target.value === "lowest") {
      sortedCopy = sortedCopy.sort(
        (a, b) => (Number(a.sale || a.price) || Infinity) - (Number(b.sale || b.price) || Infinity)
      );
    }
    if (e.target.value === "highest") {
      sortedCopy = sortedCopy.sort(
        (a, b) => (Number(b.sale || b.price) || -Infinity) - (Number(a.sale || a.price) || -Infinity)
      );
    }
    setData(sortedCopy)
  };

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

  const activeCata = (e) => {
    setActiveCategory(e.target.id);
  };

  const grid = "grid";
  const list = "list";

  const grid_or_list_view = (value) => {
    console.log(value);
    setGridOrlist(value);
  };

  console.log(gridORlist);


  let updata;
  // useEffect(() => {
  //   updata = product.filter((item) => parseFloat(item.price) <= price);
  //   console.log(updata);
  //   setData(updata)
  // }, [price]);


  useEffect(() => {
    setLength(data.length)
    sortBY
    if(length===0)
    {
      // console.log(data.length());
      console.log(length);
      updata = product.filter((item) => item.category === activeCatagory);
    }
    if(activeCatagory != "All")
    {
      console.log(data);
      console.log(activeCatagory);
      updata = product.filter((item) => item.category === activeCatagory);
      updata = updata.filter(
        (item) =>
          item.sale === "" ||
          item.sale == null ||
          item.price === "" ||
          item.price == null ||
          Number(item.sale || item.price) <= Number(price)
      );
    }
    if(activeCatagory === "All")
    {
      console.log(activeCatagory);

      console.log(data);
      updata = product
      updata = updata.filter(
        (item) =>
          item.sale === "" ||
          item.sale == null ||
          item.price === "" ||
          item.price == null ||
          Number(item.sale || item.price) <= Number(price)
      );

    }
    console.log(updata);
    setData(updata)
    
  }, [activeCatagory,price]);

console.log(data)
return (
  <div className="min-h-screen bg-[#f8f7f4] text-gray-900">

    {/* =====================================================
        SHOP HERO
    ====================================================== */}
    <section className="relative overflow-hidden border-b border-[#e7e1d8] bg-[#eee9e1]">
      {/* Decorative shapes */}
      <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-amber-900/10 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-amber-700/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 py-10 sm:px-8 md:py-12 lg:px-10">

        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-900">
            Vanam Furnitures
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Furniture that feels like home.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover thoughtfully selected pieces for living rooms, bedrooms,
            dining spaces and everything in between.
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
          <span>Home</span>
          <span className="text-gray-300">/</span>
          <span className="font-medium text-gray-800">Shop</span>
        </div>

      </div>
    </section>


    {/* =====================================================
        SHOP CONTENT
    ====================================================== */}
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

      <div className="flex flex-col gap-7 lg:flex-row">


        {/* =================================================
            FILTER SIDEBAR
        ================================================== */}
        <aside className="w-full flex-shrink-0 lg:w-[255px]">

          <div className="overflow-hidden rounded-2xl border border-[#e6e0d8] bg-white shadow-sm">

            {/* Sidebar Header */}
            <div className="border-b border-gray-100 bg-[#faf8f4] px-5 py-5">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                    Refine
                  </p>

                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    Shop Filters
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-900 shadow-sm">
                  <span className="text-sm">⌕</span>
                </div>

              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Narrow your selection to find the perfect piece.
              </p>

            </div>


            {/* Category */}
            <div className="p-5">

              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Category
                </p>

                <span className="text-[11px] text-gray-400">
                  {CategoryItem.length} styles
                </span>
              </div>


              <div className="flex flex-col gap-1.5">

                {/* All */}
                <button
                  type="button"
                  onClick={() => setActiveCategory("All")}
                  className={`
                    group flex w-full items-center justify-between rounded-xl
                    px-3 py-2.5 text-left text-sm transition-all duration-200
                    ${
                      activeCatagory === "All"
                        ? "bg-amber-900 text-white shadow-sm"
                        : "text-gray-600 hover:bg-[#f7f3ed] hover:text-gray-900"
                    }
                  `}
                >
                  <span className="font-medium">
                    All Furniture
                  </span>

                  <span
                    className={`text-xs ${
                      activeCatagory === "All"
                        ? "text-white/70"
                        : "text-gray-400"
                    }`}
                  >
                    View
                  </span>
                </button>


                {CategoryItem.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveCategory(item.name)}
                    className={`
                      group flex w-full items-center justify-between
                      rounded-xl px-3 py-2.5 text-left
                      text-sm transition-all duration-200
                      ${
                        activeCatagory === item.name
                          ? "bg-[#eee8de] text-amber-900 font-semibold"
                          : "text-gray-600 hover:bg-[#f7f3ed] hover:text-gray-900"
                      }
                    `}
                  >
                    <span>{item.name}</span>

                    <span
                      className={`
                        h-1.5 w-1.5 rounded-full transition-all
                        ${
                          activeCatagory === item.name
                            ? "bg-amber-800"
                            : "bg-gray-200 group-hover:bg-amber-300"
                        }
                      `}
                    />
                  </button>
                ))}

              </div>

            </div>


            <div className="mx-5 border-t border-gray-100" />


            {/* Price Filter */}
            <div className="p-5">

              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Price Range
                </p>

                <span className="rounded-full bg-[#f5f0e8] px-2.5 py-1 text-xs font-semibold text-amber-900">
                  ₹ {price}
                </span>
              </div>


              <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400">
                <span>₹ {min}</span>
                <span>₹ {max}</span>
              </div>


              <input
                className="
                  mt-2 h-1.5 w-full cursor-pointer
                  accent-[#7c4a20]
                "
                type="range"
                min={min}
                max={max}
                value={price}
                onInput={priceChange}
              />


              <div className="mt-4 rounded-xl bg-[#faf8f4] px-3 py-2.5">
                <p className="text-[11px] leading-5 text-gray-500">
                  Showing pieces priced up to
                  <span className="font-semibold text-gray-800">
                    {" "}₹ {price}
                  </span>
                </p>
              </div>

            </div>

          </div>

        </aside>


        {/* =================================================
            PRODUCTS
        ================================================== */}
        <main className="min-w-0 flex-1">

          {/* Toolbar */}
          <div
            className="
              mb-6 flex flex-col gap-4 rounded-2xl
              border border-[#e7e1d9] bg-white
              px-4 py-4 shadow-sm
              sm:flex-row sm:items-center sm:justify-between
              sm:px-5
            "
          >

            {/* Left */}
            <div className="flex items-center gap-4">

              <div>
                <p className="text-xs uppercase tracking-[0.17em] text-gray-400">
                  Collection
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  Explore Furniture
                </p>
              </div>

              <div className="hidden h-9 w-px bg-gray-200 sm:block" />

              <span className="text-xs text-gray-400">
                {data?.length || 0} products
              </span>

            </div>


            {/* Right */}
            <div className="flex items-center justify-between gap-3 sm:justify-end">

              {/* View Toggle */}
              <div className="flex items-center rounded-xl border border-gray-200 bg-[#faf9f7] p-1">

                <button
                  type="button"
                  id="grid"
                  onClick={() => grid_or_list_view(grid)}
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-lg
                    transition-all duration-200
                    ${
                      gridORlist === "grid"
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }
                  `}
                >
                  <BsFillGridFill className="text-base" />
                </button>

                <button
                  type="button"
                  id="list"
                  onClick={() => grid_or_list_view(list)}
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-lg
                    transition-all duration-200
                    ${
                      gridORlist === "list"
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }
                  `}
                >
                  <FaList className="text-base" />
                </button>

              </div>


              {/* Sort */}
              <div className="flex items-center gap-2">

                <span className="hidden text-xs text-gray-400 sm:block">
                  Sort
                </span>

                <div className="relative">

                  <select
                    className="
                      appearance-none
                      w-44
                      rounded-xl
                      border
                      border-gray-200
                      bg-[#faf9f7]
                      px-4
                      py-2.5
                      pr-9
                      text-sm
                      text-gray-700
                      outline-none
                      transition
                      hover:border-gray-300
                      focus:border-amber-800
                      focus:ring-1
                      focus:ring-amber-800
                    "
                    id="vegetableSelectId"
                    name="selectedVegetable"
                    onClick={sortBY}
                  >
                    <option value="a-z">
                      Name A-Z
                    </option>

                    <option value="z-a">
                      Name Z-A
                    </option>

                    <option value="lowest">
                      Price Low to High
                    </option>

                    <option value="highest">
                      Price High to Low
                    </option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    ▾
                  </span>

                </div>

              </div>

            </div>
          </div>


          {/* Active filter summary */}
          <div className="mb-5 flex flex-wrap items-center gap-2">

            {activeCatagory && activeCatagory !== "All" && (
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eee8de] px-3 py-1.5 text-xs font-medium text-amber-900">
                {activeCatagory}
              </div>
            )}

            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs text-gray-500 shadow-sm ring-1 ring-gray-100">
              Up to ₹ {price}
            </div>

          </div>


          {/* Product Grid / List */}
          <div className="w-full">

            <ProductContainer
              data={data}
              grid={gridORlist}
            />

          </div>

        </main>

      </div>

    </div>

  </div>
);
}
