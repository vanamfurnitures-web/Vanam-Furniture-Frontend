import React from "react";
import { AiFillDelete } from "react-icons/ai";

export default function GallaryImgShow({
  id,
  imgURL,
  deletImage,
}) {
  function del() {
    deletImage(id);
  }

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-xl">

      <img
        src={imgURL}
        alt="Product gallery"
        className="
          h-full
          w-full
          rounded-xl
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/10
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Delete */}
      <button
        type="button"
        onClick={del}
        className="
          absolute
          right-2
          top-2
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          bg-white/90
          text-gray-600
          shadow-md
          transition-all
          duration-200
          hover:bg-red-500
          hover:text-white
        "
        aria-label="Delete gallery image"
      >
        <AiFillDelete className="text-sm" />
      </button>

    </div>
  );
}