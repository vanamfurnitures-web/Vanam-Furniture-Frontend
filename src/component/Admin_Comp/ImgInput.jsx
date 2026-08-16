import React from "react";
import { BsFillPencilFill } from "react-icons/bs";

export default function ImgInput({ id, uploadImage }) {
  return (
    <label
      htmlFor={id}
      className="
        group
        relative
        flex
        h-full
        w-full
        cursor-pointer
        items-center
        justify-center
      "
    >
      <div className="flex flex-col items-center justify-center">

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-[#cfc6ba]
            bg-white
            text-gray-400
            shadow-sm
            transition-all
            duration-300
            group-hover:border-amber-800
            group-hover:bg-[#f8f2e9]
            group-hover:text-amber-900
            group-hover:shadow-md
          "
        >
          <BsFillPencilFill className="text-xl" />
        </div>

        <p className="mt-4 text-sm font-semibold text-gray-600 group-hover:text-amber-900">
          Add Image
        </p>

        <p className="mt-1 text-[11px] text-gray-400">
          Click to choose an image
        </p>

      </div>

      <input
        type="file"
        id={id}
        name={id}
        accept="image/*"
        onChange={uploadImage}
        className="
          absolute
          inset-0
          h-full
          w-full
          cursor-pointer
          opacity-0
        "
      />
    </label>
  );
}