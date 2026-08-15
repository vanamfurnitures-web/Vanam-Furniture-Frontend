import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function InfoDiv_2() {
  const navigate = useNavigate();

  return (
    <section className="w-full">

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div className="order-2 lg:order-1">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-800">
            Designed for living
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            The little details
            <span className="block text-amber-900">
              change everything.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-gray-600 sm:text-base">
            From the softness of a bedroom to the warmth of a living room,
            furniture changes the way a space feels. Our collections are built
            around that simple idea — beautiful pieces that belong naturally
            in your everyday life.
          </p>

          <div className="mt-7 space-y-4">

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9e1d6] text-xs text-amber-900">
                ✓
              </span>

              <p className="text-sm text-gray-700">
                Warm, timeless aesthetics
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9e1d6] text-xs text-amber-900">
                ✓
              </span>

              <p className="text-sm text-gray-700">
                Comfort for everyday living
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e9e1d6] text-xs text-amber-900">
                ✓
              </span>

              <p className="text-sm text-gray-700">
                Pieces designed to work together
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            Shop the collection

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>


        {/* =====================================================
            BEDROOM IMAGE
        ====================================================== */}
        <div className="relative order-1 lg:order-2">

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

            <img
              src="https://www.interwoodfurniture.shop/assets/images/bedroom.png"
              alt="Elegant warm bedroom furniture"
              className="h-[380px] w-full object-cover object-center sm:h-[480px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          </div>


          <div className="absolute -right-3 top-6 rounded-2xl border border-white/80 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md sm:-right-5">

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-800">
              Vanam
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              Comfort is part of the design.
            </p>

          </div>


          <div className="absolute -bottom-5 left-4 rounded-2xl bg-[#211c17] px-5 py-4 text-white shadow-xl sm:left-7">

            <p className="text-xs text-gray-400">
              Thoughtful spaces
            </p>

            <p className="mt-1 text-sm font-semibold text-amber-300">
              Made to feel like home.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}