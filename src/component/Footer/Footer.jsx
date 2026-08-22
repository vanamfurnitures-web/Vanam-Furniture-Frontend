import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../img/Vanam_funrniture_logo.jpeg";

export default function Footer() {
  const location = useLocation();

  const hideFooterRoutes = [
    "/admin/dashboard",
    "/admin/products",
    "/admin/products/addproducts",
    "/admin/products/addproducts/edit",
    "/admin/users",
    "/admin/orders",
    "/admin/review",
  ];

  // Check if the current route matches any of the paths to hide the footer
  const shouldHideFooter = hideFooterRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
return (
  <>
    {!shouldHideFooter && (
      <footer className="w-full bg-[#201b17] text-white">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-16 lg:px-10">

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] lg:gap-12">

            {/* =================================================
                BRAND
            ================================================== */}
            <div className="lg:pr-8">

              <div className="inline-flex rounded-x shadow-lg">
                <img
                  src={logo}
                  alt="Vanam Furnitures and Interiors"
                  className="h-20 w-auto max-w-[170px] object-contain"
                />
              </div>

              <p className="mt-6 max-w-sm text-sm leading-7 text-gray-300">
                Furniture that brings together comfort, character and
                timeless style — created to make your everyday spaces
                feel like home.
              </p>

              <div className="mt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Vanam Furnitures
                </p>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Comfort · Character · Style
                </p>
              </div>

            </div>


            {/* =================================================
                CATEGORY
            ================================================== */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Collections
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Shop by Category
              </h3>

              <ul className="mt-5 space-y-3">

                {[
                  "Chair",
                  "Sofa",
                  "Bed",
                  "Table",
                  "Closet",
                  "Kitchen",
                  "3D Models/Miniatures",
                ].map((item) => (
                  <li
                    key={item}
                    className="group flex cursor-pointer items-center text-sm text-gray-400 transition hover:text-white"
                  >
                    <span className="mr-2 text-amber-500 opacity-0 transition group-hover:opacity-100">
                      →
                    </span>

                    <span>{item}</span>
                  </li>
                ))}

              </ul>

            </div>


            {/* =================================================
                POPULAR PRODUCTS
            ================================================== */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Favourites
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Popular Products
              </h3>

              <ul className="mt-5 space-y-3">

                {[
                  "Single Sofa Black",
                  "Wooden Bookcase",
                  "Wooden Chair",
                  "Luxury White Bed",
                ].map((item) => (
                  <li
                    key={item}
                    className="group flex cursor-pointer items-center text-sm text-gray-400 transition hover:text-white"
                  >
                    <span className="mr-2 text-amber-500 opacity-0 transition group-hover:opacity-100">
                      →
                    </span>

                    <span>{item}</span>
                  </li>
                ))}

              </ul>

            </div>


            {/* =================================================
                SITEMAP
            ================================================== */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                Explore
              </p>

              <h3 className="mt-2 text-lg font-semibold text-white">
                Sitemap
              </h3>

              <ul className="mt-5 space-y-3">

                {[
                  "Product",
                  "Service",
                  "Article",
                  "About Us",
                  "Refund & Return Policy",
                ].map((item) => (
                  <li
                    key={item}
                    className="group flex cursor-pointer items-center text-sm text-gray-400 transition hover:text-white"
                  >
                    <span className="mr-2 text-amber-500 opacity-0 transition group-hover:opacity-100">
                      →
                    </span>

                    <span>{item}</span>
                  </li>
                ))}

              </ul>

            </div>

          </div>


          {/* =================================================
              DIVIDER
          ================================================== */}
          <div className="my-10 border-t border-white/10" />


          {/* =================================================
              BOTTOM CTA STRIP
          ================================================== */}
          <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <p className="text-sm font-semibold text-white">
                Create a space that feels like you.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Discover furniture made for everyday living.
              </p>
            </div>

            <button
              type="button"
              className="
                w-full
                rounded-full
                bg-amber-800
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-amber-700
                sm:w-auto
              "
            >
              Explore Furniture →
            </button>

          </div>

        </div>


        {/* =====================================================
            COPYRIGHT BAR
        ====================================================== */}
        <div className="border-t border-white/10 bg-[#171310]">

          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

            <p className="text-xs text-gray-500">
              © 2026 Vanam Furniture. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-5 text-xs text-gray-500">

              <span className="cursor-pointer transition hover:text-white">
                Privacy Policy
              </span>

              <span className="cursor-pointer transition hover:text-white">
                Terms & Conditions
              </span>

              <span className="cursor-pointer transition hover:text-white">
                Refund & Return
              </span>

            </div>

          </div>

        </div>

      </footer>
    )}
  </>
);
}
