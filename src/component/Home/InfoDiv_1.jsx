import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function InfoDiv_1() {
  const navigate = useNavigate();

  return (
    <section className="w-full">

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* =====================================================
            IMAGE
        ====================================================== */}
        <div className="relative">

          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

            <img
              src="https://parkerandrome.ca/cdn/shop/files/Generated_Image_January_13_2026_-_12_15PM.jpg?v=1768324576&width=5760"
              alt="Warm modern living room"
              className="h-[380px] w-full object-cover object-center sm:h-[480px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          </div>


          {/* Floating information card */}
          <div className="absolute -bottom-5 left-4 max-w-[270px] rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur-md sm:left-7">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#f1ebe2] text-amber-900">
                <BsCheckCircle />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Comfort without compromise
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Pieces designed to feel as good as they look.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-800">
            The Vanam Philosophy
          </p>

          <h2 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            A beautiful room
            <span className="block text-amber-900">
              should feel beautiful too.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-gray-600 sm:text-base">
            Furniture isn't simply what fills a room. It shapes how you
            experience it. We believe the best interiors balance clean design,
            warmth, comfort and personality.
          </p>

          <div className="mt-7 space-y-4">

            {[
              "Designed for everyday comfort",
              "Timeless pieces that complement your space",
              "Thoughtfully selected collections",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-3"
              >

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1ebe2] text-xs text-amber-900">
                  ✓
                </span>

                <span className="text-sm text-gray-700">
                  {text}
                </span>

              </div>
            ))}

          </div>

          <button
            type="button"
            onClick={() => navigate("/about")}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-900"
          >
            Discover our story

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>

      </div>

    </section>
  );
}