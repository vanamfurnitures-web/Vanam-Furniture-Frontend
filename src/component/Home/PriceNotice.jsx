import React from "react";

const priceMessages = {
  Kitchen: "Final price may vary by size.",
  "3D Models/Miniatures": "Final price may vary by material.",
};

export default function PriceNotice({ category }) {
  const message = priceMessages[category];

  if (!message) {
    return null;
  }

  return (
    <p className="mt-2 max-w-[150px] text-[10px] leading-4 text-gray-400">
      <span className="mr-1 text-gray-400" aria-hidden="true">
        *
      </span>
      {message}
    </p>
  );
}
