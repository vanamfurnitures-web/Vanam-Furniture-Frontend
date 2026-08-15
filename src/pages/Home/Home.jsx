import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Category from "../../component/Home/Category";
import InfoDiv_1 from "../../component/Home/InfoDiv_1";
import Cata_wise_product from "../../component/Home/Cata_wise_product";
import InfoDiv_2 from "../../component/Home/InfoDiv_2";

export default function Home() {
  const [data, setData] = useState([]);

  const [{ product }, dispatch] = useStateValue();

  const navigate = useNavigate();

  async function fetchingData() {
    try {
      dispatch({
        type: actionType.UPDATE_PRODUCTS,
        updateProd: false,
      });

      const response = await axios.get(
        `${import.meta.env.VITE_LINK}/products`
      );

      const products = response?.data?.product || [];

      setData(products);

      dispatch({
        type: actionType.SET_PRODUCTS,
        product: products,
      });

      localStorage.setItem("product", JSON.stringify(products));
    } catch (err) {
      console.error("Home product fetch error:", err);

      toast.error(
        err?.response?.data?.msg || "Unable to load products"
      );
    }
  }

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#faf9f7] text-gray-900">

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#eee8df]">

        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-amber-900/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-amber-700/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-12 lg:px-10 lg:py-16">

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">

            {/* Text */}
            <div className="order-2 max-w-xl lg:order-1">

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-900/10 bg-white/70 px-4 py-2 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-800" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-900">
                  Vanam Furnitures
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.03] tracking-tight text-gray-900 sm:text-5xl lg:text-[64px]">
                Rooms have
                <span className="block text-amber-900">
                  a feeling.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
                Furniture that brings together comfort, character and
                timeless design — created to make your everyday spaces
                feel unmistakably yours.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => navigate("/shop")}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition duration-300 hover:bg-amber-900"
                >
                  Explore Collection

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/about")}
                  className="rounded-full border border-gray-300 bg-white/80 px-7 py-3.5 text-sm font-semibold text-gray-800 backdrop-blur transition hover:border-amber-800 hover:text-amber-900"
                >
                  Discover Vanam
                </button>

              </div>

              <div className="mt-9 flex items-center gap-7 border-t border-gray-300/70 pt-6">

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Comfort
                  </p>
                  <p className="text-xs text-gray-500">
                    Designed for living
                  </p>
                </div>

                <div className="h-8 w-px bg-gray-300" />

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Style
                  </p>
                  <p className="text-xs text-gray-500">
                    Made to belong
                  </p>
                </div>

                <div className="h-8 w-px bg-gray-300" />

                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Quality
                  </p>
                  <p className="text-xs text-gray-500">
                    Chosen with care
                  </p>
                </div>

              </div>

            </div>


            {/* Hero Image */}
            <div className="order-1 lg:order-2">

              <div className="relative ml-auto max-w-2xl">

                <div className="overflow-hidden rounded-[2.5rem] shadow-2xl">

                  <img
  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
  alt="Luxury modern living room"
  className="h-[330px] w-full object-cover object-center sm:h-[440px] lg:h-[560px]"
/>

                </div>

                <div className="absolute bottom-5 left-5 max-w-[240px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:bottom-7 sm:left-7">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
                    Curated for living
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Warm spaces. Quiet luxury.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          CATEGORIES
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">

        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-800">
              Explore the collection
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Find your kind of comfort.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
              From statement pieces to everyday essentials, discover furniture
              for every corner of your home.
            </p>

          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-amber-800 hover:text-amber-900"
          >
            View all
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>

        <div className="mt-10">
          <Category />
        </div>

      </section>


      {/* =========================================================
          BRAND STORY
      ========================================================== */}
      <section className="border-y border-[#e8e1d8] bg-white">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-10">
          <InfoDiv_1 />
        </div>

      </section>


      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-10">

        <Cata_wise_product />

      </section>


      {/* =========================================================
          QUALITY / LIFESTYLE
      ========================================================== */}
      <section className="border-y border-[#e8e1d8] bg-[#f3eee6]">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-10">
          <InfoDiv_2 />
        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#211c17]">

          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-amber-700/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />

          <div className="relative px-6 py-16 text-center sm:px-10 md:py-20">

            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
              Your space. Your story.
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Start with one beautiful piece.
              <span className="block text-amber-300">
                Build a home around it.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Explore the Vanam collection and find furniture that feels
              right for the way you live.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-xl transition hover:bg-amber-100"
            >
              Explore Vanam

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}