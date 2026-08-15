import React, { useEffect, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import ProductContainer from "./ProductContainer";

export default function Cata_wise_product() {
  const [{ product }] = useStateValue();

  const [data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("new_arrival");

  useEffect(() => {
    setData(product ? product.slice(0, 8) : []);
  }, [product]);

  function sorting_product(e) {
    const value = e.currentTarget.id;

    setActiveCategory(value);

    if (value === "new_arrival") {
      setData(product ? product.slice(0, 8) : []);
    }

    if (value === "special_offer") {
      const response =
        product?.filter((item) => item.offer != null) || [];

      setData(response);
    }

    if (value === "best_sellers") {
      setData(product ? product.slice(0, 8) : []);
    }
  }

  const tabs = [
    ["new_arrival", "New Arrival"],
    ["special_offer", "Special Offers"],
    ["best_sellers", "Best Sellers"],
  ];

  return (
    <section className="w-full">

      {/* Heading */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

        <div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-800">
            Curated for you
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Pieces worth bringing home.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500">
            Explore our latest arrivals, selected offers and favourite
            collections.
          </p>

        </div>


        {/* Tabs */}
        <div className="flex flex-wrap gap-2">

          {tabs.map(([id, label]) => (
            <button
              key={id}
              id={id}
              type="button"
              onClick={sorting_product}
              className={`
                rounded-full
                px-4
                py-2.5
                text-xs
                font-semibold
                transition-all
                duration-200
                ${
                  activeCategory === id
                    ? "bg-gray-900 text-white shadow-md"
                    : "border border-gray-300 bg-white text-gray-600 hover:border-amber-800 hover:text-amber-900"
                }
              `}
            >
              {label}
            </button>
          ))}

        </div>

      </div>


      {/* Product Container */}
      <div className="mt-8">

        <ProductContainer
          data={data}
          updateDATA={() =>
            setData(product ? product.slice(0, 8) : [])
          }
        />

      </div>

    </section>
  );
}