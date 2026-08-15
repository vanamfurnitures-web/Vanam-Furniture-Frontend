import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [, dispatch] = useStateValue();

  const navigate = useNavigate();

  const generateSlides = [
    {
      name: "Chair",
      src: "https://i.ibb.co/6tc3MWM/comfortable-office-chair.jpg",
    },
    {
      name: "Sofa",
      src: "https://www.sofaturkey.com/wp-content/uploads/Siri-Sofa-Set-SofaTurkey-16-1024x683.webp",
    },
    {
      name: "Table",
      src: "https://andersonsofinverurie.co.uk/cdn/shop/collections/et1803-yon-table-andersons-lifestyle_6b54fc74-9570-418f-ab0e-e0f3a02a1762_1024x1024.png?v=1762856020",
    },
    {
      name: "Bed",
      src: "https://www.interwoodfurniture.shop/assets/images/bedroom.png",
    },
    {
      name: "Closet",
      src: "https://i.ibb.co/qpJMNf2/chastity-cortijo-o-Ofu-QYni-REA-unsplash.jpg",
    },
  ];

  const shop_route = (e) => {
    const category = e.currentTarget.id;

    dispatch({
      type: actionType.SET_SHOP_CATEGORY,
      shop_category: category,
    });

    navigate("/shop");
  };

  return (
    <div className="w-full">

      <Splide
        options={{
          perPage: 4,
          gap: "1.25rem",
          rewind: true,
          arrows: true,
          pagination: false,

          breakpoints: {
            1100: {
              perPage: 3,
            },

            768: {
              perPage: 2,
            },

            640: {
              perPage: 1,
            },
          },
        }}
      >

        {generateSlides.map((slide) => (
          <SplideSlide key={slide.name}>

            <div className="group relative h-[350px] overflow-hidden rounded-[1.75rem] bg-gray-100">

              <img
                src={slide.src}
                alt={slide.name}
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
                  Collection
                </p>

                <h3 className="mt-1 text-2xl font-semibold text-white">
                  {slide.name}
                </h3>

                <button
                  type="button"
                  id={slide.name}
                  onClick={shop_route}
                  className="
                    mt-4
                    rounded-full
                    bg-white
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    text-gray-900
                    shadow-lg
                    transition
                    hover:bg-amber-100
                  "
                >
                  Explore Collection →
                </button>

              </div>

            </div>

          </SplideSlide>
        ))}

      </Splide>

    </div>
  );
}