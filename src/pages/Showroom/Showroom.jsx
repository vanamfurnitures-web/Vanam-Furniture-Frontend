import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

export default function Showroom() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#eae4db]">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">

          {/* Content */}
          <div className="max-w-xl">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-900">
              Vanam Furnitures
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Step into the
              <span className="block text-amber-900">
                Vanam experience.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
              See our furniture up close, explore different styles, and
              imagine how each piece could transform your space.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/10 transition hover:bg-amber-800"
              >
                Explore Collection
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                className="rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 transition hover:border-amber-800 hover:text-amber-900"
              >
                Plan a Visit
              </button>

            </div>
          </div>


          {/* Hero Image */}
          <div className="relative">

            <div className="mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-[#d8d0c5] shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Elegant furniture showroom"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

            </div>


            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-xl backdrop-blur-sm sm:-left-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                Experience
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Furniture in its natural setting
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SHOWROOM INTRO
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
              Visit & Explore
            </p>

            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Don't just picture it.
              <span className="block text-amber-900">
                Experience it.
              </span>
            </h2>

          </div>

          <div className="space-y-5 text-base leading-8 text-gray-600">

            <p>
              Online shopping makes discovery easy, but there is something
              special about seeing furniture in person. Feel the materials,
              explore proportions, and experience how each piece fits into
              a thoughtfully styled space.
            </p>

            <p>
              Our showroom concept is designed to help you move beyond
              measurements and photos and discover what truly feels right
              for your home.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          COLLECTION SPACES
      ====================================================== */}
      <section className="bg-white border-y border-[#e8e2d9]">

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
              Explore Our Spaces
            </p>

            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Find inspiration for every room
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500">
              Explore different furniture styles and see how individual
              pieces can work together to create a complete interior.
            </p>

          </div>


          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Living Room */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3]">

                <img
                  src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85"
                  alt="Living room furniture"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Space One
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">
                    Living Room
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Comfortable pieces for conversations, relaxation and
                    everyday living.
                  </p>
                </div>

              </div>
            </div>


            {/* Bedroom */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3]">

                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
                  alt="Bedroom furniture"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Space Two
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">
                    Bedroom
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Calm, comfortable designs created for your personal
                    retreat.
                  </p>
                </div>

              </div>
            </div>


            {/* Dining */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3]">

                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                  alt="Dining furniture"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Space Three
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">
                    Dining
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Gather around pieces designed to make everyday moments
                    memorable.
                  </p>
                </div>

              </div>
            </div>


            {/* Work / Study */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-[4/3]">

                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
                  alt="Workspace furniture"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                    Space Four
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold">
                    Workspace
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    Thoughtful furniture for focused work and creative
                    everyday spaces.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          VISIT INFORMATION
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Location */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
              <FiMapPin className="text-xl" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Visit Us
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add your showroom address here so customers can easily find
              your store.
            </p>

          </div>


          {/* Opening Hours */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
              <FiClock className="text-xl" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Opening Hours
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add your showroom timings here so visitors know the best
              time to drop in.
            </p>

          </div>


          {/* Contact */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
              <FiPhone className="text-xl" />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Talk to Us
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add your showroom phone number here for product questions,
              appointments and assistance.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-5 pb-16 sm:px-8 md:pb-24 lg:px-10">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#211c17] px-6 py-14 text-center text-white sm:px-10 md:py-20">

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-800/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Your Space Awaits
            </p>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl md:text-5xl">
              Come see it.
              <span className="block text-amber-300">
                Feel it.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-300 sm:text-base">
              Browse the collection online, then visit the showroom to
              experience your favourites in person.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-amber-100"
            >
              Shop Furniture
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}