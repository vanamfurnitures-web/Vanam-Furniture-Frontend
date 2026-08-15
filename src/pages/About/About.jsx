import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiHome,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import { MdChair, MdDesignServices } from "react-icons/md";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#eee9e1]">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-900/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">

          {/* Hero Content */}
          <div className="max-w-xl">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-amber-900">
              About Vanam Furnitures
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Furniture that makes
              <span className="block text-amber-900">
                a house feel like home.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
              At Vanam Furnitures, we believe furniture should be more than
              something that fills a room. It should create comfort, express
              personality, and become part of the moments you remember.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/10 transition hover:bg-amber-800"
              >
                Explore Furniture
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/showroom")}
                className="rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-amber-800 hover:text-amber-900"
              >
                Visit Showroom
              </button>

            </div>
          </div>


          {/* Hero Visual */}
          <div className="relative">

            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-[#ddd5c9] shadow-2xl">

              {/* Replace this URL with your own showroom/furniture image */}
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85"
                alt="Elegant furniture interior"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            </div>


            {/* Floating Card */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/80 bg-white/95 p-5 shadow-xl backdrop-blur-sm sm:-left-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ede5] text-amber-900">
                  <FiHeart className="text-xl" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Designed for living
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Comfort meets character
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
              Our Philosophy
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
              Thoughtful pieces for
              <span className="text-amber-900"> everyday living.</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-gray-600">
            <p>
              A beautiful room starts with the right foundation. We focus on
              furniture that feels inviting, looks timeless, and works
              naturally within your space.
            </p>

            <p>
              From statement pieces to everyday essentials, our collection is
              designed to help you create interiors that feel warm, balanced,
              and uniquely yours.
            </p>
          </div>

        </div>
      </section>


      {/* =====================================================
          VALUES
      ====================================================== */}
      <section className="border-y border-[#e8e2d9] bg-white">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
              Why Vanam
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
              Made around the way you live
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-500">
              Every space has its own character. Our approach is to make it
              easier to find pieces that complement yours.
            </p>

          </div>


          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* Card */}
            <div className="group rounded-2xl border border-gray-200 bg-[#faf9f7] p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-amber-900 shadow-sm">
                <MdChair className="text-2xl" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Comfort First
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Furniture should look beautiful while still feeling natural
                and comfortable in everyday life.
              </p>

            </div>


            <div className="group rounded-2xl border border-gray-200 bg-[#faf9f7] p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-amber-900 shadow-sm">
                <MdDesignServices className="text-2xl" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Timeless Design
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                We love designs that can grow with your home rather than
                disappearing with the next trend.
              </p>

            </div>


            <div className="group rounded-2xl border border-gray-200 bg-[#faf9f7] p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-amber-900 shadow-sm">
                <FiShield className="text-xl" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Thoughtful Selection
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                A considered collection helps you spend less time searching
                and more time creating your space.
              </p>

            </div>


            <div className="group rounded-2xl border border-gray-200 bg-[#faf9f7] p-6 transition hover:-translate-y-1 hover:shadow-lg">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-amber-900 shadow-sm">
                <FiTruck className="text-xl" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                Made for Your Journey
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                We want your furniture to become part of your home for years
                to come.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          BRAND STATEMENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-10">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#1f1b17] px-6 py-14 text-white sm:px-10 md:px-16 md:py-20">

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-700/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              The Vanam Way
            </p>

            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Your space should tell
              <span className="block text-amber-300">
                your story.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Whether you're creating a quiet corner, refreshing your living
              room, or furnishing an entire home, choose pieces that feel
              right for you.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-amber-100"
            >
              Discover the Collection
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="border-t border-[#e8e2d9] bg-[#f5f1eb]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row lg:px-10">

          <div>
            <p className="text-lg font-semibold text-gray-900">
              Looking for the perfect piece?
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Explore the Vanam Furniture collection.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            Shop Now
            <FiArrowRight />
          </button>

        </div>

      </section>

    </div>
  );
}