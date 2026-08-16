import React from "react";
import { AiFillDelete } from "react-icons/ai";

export default function ImgShow({ id, imgURL, deletImage }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl">

      <img
        src={imgURL}
        alt="Product"
        className="
          h-full
          w-full
          rounded-2xl
          object-cover
          transition-transform
          duration-500
          group-hover:scale-[1.02]
        "
      />

      {/* Image overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/50
          via-transparent
          to-transparent
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Delete button */}
      <button
        type="button"
        onClick={deletImage}
        className="
          absolute
          right-3
          top-3
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white/90
          text-gray-600
          shadow-lg
          backdrop-blur-sm
          transition-all
          duration-200
          hover:bg-red-500
          hover:text-white
        "
        aria-label="Delete image"
      >
        <AiFillDelete className="text-lg" />
      </button>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-[10px] font-medium text-white">
          Featured image
        </p>
      </div>

    </div>
  );
}