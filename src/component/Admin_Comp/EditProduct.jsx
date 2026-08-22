import React, { useEffect, useState } from "react";
import ImgShow from "./ImgShow";
import ImgInput from "./ImgInput";
import Loader from "../Loader";
import GallaryImgShow from "./GallaryImgShow";
import { toast } from "react-toastify";
import Select from "react-tailwindcss-select";
import axios from "axios";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

export default function EditProduct({
  item,
  visible,
  onClose,
}) {
  const [{ product, user, updateProd }, dispatch] = useStateValue();

  const [isLoadding, setIsLoadding] = useState(false);

  const [formData, setFormData] = useState(item || {});

  const [catego, setCatego] = useState(null);

  const {
    item_name = "",
    sale = "",
    price = "",
    category = "",
    image = null,
    quantity = 1,
    SKU = "",
    short_descrip = "",
    full_descrip = "",
    gal_1_imgURL = null,
    gal_2_imgURL = null,
    gal_3_imgURL = null,
  } = formData;

  /* =========================================================
      CATEGORY OPTIONS
  ========================================================= */
  const options = [
    { value: "Chair", label: "Chair" },
    { value: "Table", label: "Table" },
    { value: "Bed", label: "Bed" },
    { value: "Closet", label: "Closet" },
    { value: "Sofa", label: "Sofa" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "3D Models/Miniatures", label: "3D Models/Miniatures" }
  ];

  /* =========================================================
      SYNC ITEM INTO FORM
  ========================================================= */
  useEffect(() => {
    if (item) {
      setFormData(item);

      const selectedCategory =
        options.find(
          (option) => option.value === item.category
        ) || null;

      setCatego(selectedCategory);
    }
  }, [item]);

  /* =========================================================
      CATEGORY CHANGE
  ========================================================= */
  const categoryChange = (value) => {
    setCatego(value);

    setFormData((prevState) => ({
      ...prevState,
      category: value?.value || "",
    }));
  };

  /* =========================================================
      INPUT CHANGE
  ========================================================= */
  function onChange(e) {
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  }

  /* =========================================================
      DELETE IMAGE
  ========================================================= */
  function deletImage(id) {
    setFormData((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  }

  /* =========================================================
      IMAGE UPLOAD
  ========================================================= */
async function uploadImage(e) {
  setIsLoadding(true);

  const uploadedImage = e.target.files?.[0];

  if (!uploadedImage) {
    setIsLoadding(false);
    return;
  }

  try {
    const data = new FormData();

    data.append("image", uploadedImage);

    const response = await axios.post(
      `${import.meta.env.VITE_LINK}/upload`,
      data
    );

    console.log("Upload response:", response.data);

    const imageUrl = response?.data?.data?.secure_url;

    if (!imageUrl) {
      throw new Error("Cloudinary image URL not returned");
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: imageUrl,
    }));

    console.log(
      "Image uploaded successfully:",
      imageUrl
    );
  } catch (error) {
    console.error("Image upload failed:", error);

    console.error(
      "Server response:",
      error?.response?.data || "No server response"
    );

    toast.error(
      error?.response?.data?.message ||
        "Image upload failed"
    );
  } finally {
    setIsLoadding(false);
  }
}

  /* =========================================================
      UPDATE PRODUCT
  ========================================================= */
  async function onSubmit(e) {
    e.preventDefault();

    if (!formData?._id) {
      toast.error("Product ID is missing");
      return;
    }

    if (
      sale !== "" &&
      price !== "" &&
      Number(sale) > Number(price)
    ) {
      toast.error(
        "Selling price should be lower than the regular price"
      );
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_LINK}/products/${formData._id}`,
        formData
      );

      dispatch({
        type: actionType.SET_PRODUCTS,
        product: response.data.product,
      });

      localStorage.setItem(
        "product",
        JSON.stringify(response.data.product)
      );

      toast.success("Product updated successfully");

      onClose();
    } catch (err) {
      console.error(err);

      const responseText = err?.response?.data;

      toast.error(
        responseText?.msg ||
          responseText?.message ||
          "Failed to update product"
      );
    }
  }

  /* =========================================================
      CLOSE
  ========================================================= */
  const handleOnChange = (e) => {
    if (
      e.target.id === "cont" ||
      e.target.id === "close"
    ) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      id="cont"
      onClick={handleOnChange}
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        bg-black/50
        px-4
        py-5
        backdrop-blur-md
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          flex
          max-h-[94vh]
          w-full
          max-w-[1250px]
          flex-col
          overflow-hidden
          rounded-[2rem]
          border
          border-[#e5dfd6]
          bg-[#f8f6f2]
          shadow-2xl
        "
      >

        {/* =====================================================
            MODAL HEADER
        ====================================================== */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 bg-[#211c17] px-6 py-5 text-white sm:px-8">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300">
              Product Management
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Edit Product
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Update product information and media.
            </p>

          </div>

          <button
            id="close"
            type="button"
            onClick={handleOnChange}
            className="
              flex
              h-10
              w-10
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-xl
              text-gray-200
              transition
              hover:bg-white/20
              hover:text-white
            "
          >
            ×
          </button>

        </div>


        {/* =====================================================
            SCROLLABLE BODY
        ====================================================== */}
        <div
          className="
            overflow-y-auto
            p-5
            sm:p-7
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >

          <form onSubmit={onSubmit}>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">

              {/* =================================================
                  IMAGE SECTION
              ================================================== */}
              <section className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm">

                <div className="mb-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-800">
                    Product Media
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    Images
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Update the featured image and gallery.
                  </p>

                </div>


                {/* Featured */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <p className="text-sm font-semibold text-gray-800">
                      Featured Image
                    </p>

                    {image && (
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
                        Uploaded
                      </span>
                    )}

                  </div>

                  <div
                    className="
                      relative
                      flex
                      h-[360px]
                      w-full
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-dashed
                      border-[#d9d1c6]
                      bg-[#f8f6f2]
                    "
                  >
                    <div className="h-full w-full">

                      {image ? (
                        <ImgShow
                          id="image"
                          imgURL={image}
                          deletImage={() =>
                            deletImage("image")
                          }
                        />
                      ) : (
                        <ImgInput
                          id="image"
                          uploadImage={uploadImage}
                        />
                      )}

                    </div>

                    {isLoadding && (
                      <div className="
                        absolute
                        inset-0
                        z-10
                        flex
                        items-center
                        justify-center
                        bg-white/60
                        backdrop-blur-sm
                      ">
                        <Loader />
                      </div>
                    )}

                  </div>

                </div>


                {/* Gallery */}
                <div className="mt-6">

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-sm font-semibold text-gray-800">
                      Gallery
                    </p>

                    <span className="text-[10px] text-gray-400">
                      3 slots
                    </span>

                  </div>

                  <div className="grid grid-cols-3 gap-3">

                    {/* Gallery 1 */}
                    <div className="aspect-square overflow-hidden rounded-xl border border-dashed border-[#d9d1c6] bg-[#f8f6f2]">

                      {gal_1_imgURL ? (
                        <GallaryImgShow
                          id="gal_1_imgURL"
                          imgURL={gal_1_imgURL}
                          deletImage={deletImage}
                        />
                      ) : (
                        <ImgInput
                          id="gal_1_imgURL"
                          uploadImage={uploadImage}
                        />
                      )}

                    </div>


                    {/* Gallery 2 */}
                    <div className="aspect-square overflow-hidden rounded-xl border border-dashed border-[#d9d1c6] bg-[#f8f6f2]">

                      {gal_2_imgURL ? (
                        <GallaryImgShow
                          id="gal_2_imgURL"
                          imgURL={gal_2_imgURL}
                          deletImage={deletImage}
                        />
                      ) : (
                        <ImgInput
                          id="gal_2_imgURL"
                          uploadImage={uploadImage}
                        />
                      )}

                    </div>


                    {/* Gallery 3 */}
                    <div className="aspect-square overflow-hidden rounded-xl border border-dashed border-[#d9d1c6] bg-[#f8f6f2]">

                      {gal_3_imgURL ? (
                        <GallaryImgShow
                          id="gal_3_imgURL"
                          imgURL={gal_3_imgURL}
                          deletImage={deletImage}
                        />
                      ) : (
                        <ImgInput
                          id="gal_3_imgURL"
                          uploadImage={uploadImage}
                        />
                      )}

                    </div>

                  </div>

                </div>

              </section>


              {/* =================================================
                  DETAILS
              ================================================== */}
              <section className="rounded-[1.5rem] border border-[#e5dfd6] bg-white p-5 shadow-sm sm:p-7">

                <div className="border-b border-gray-100 pb-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-800">
                    Product Information
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    Details
                  </h3>

                </div>


                <div className="mt-6 space-y-6">

                  {/* Product Name */}
                  <div>

                    <label
                      htmlFor="item_name"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Product Name
                    </label>

                    <input
                      type="text"
                      id="item_name"
                      value={item_name}
                      onChange={onChange}
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-[#fcfbf9]
                        px-4
                        py-3
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-amber-800
                        focus:bg-white
                        focus:ring-2
                        focus:ring-amber-800/10
                      "
                    />

                  </div>


                  {/* Pricing */}
                  <div>

                    <p className="mb-3 text-sm font-semibold text-gray-800">
                      Pricing
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* Regular Price */}
                      <div className="rounded-xl bg-[#f7f4ef] p-4">

                        <label
                          htmlFor="price"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500"
                        >
                          Regular Price
                        </label>

                        <div className="flex items-center gap-2">

                          <span className="text-gray-400">
                            ₹
                          </span>

                          <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={onChange}
                            min="0"
                            className="
                              w-full
                              bg-transparent
                              text-lg
                              font-semibold
                              text-gray-900
                              outline-none
                            "
                          />

                        </div>

                      </div>


                      {/* Sale Price */}
                      <div className="rounded-xl bg-[#f7f4ef] p-4">

                        <label
                          htmlFor="sale"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500"
                        >
                          Sale Price
                        </label>

                        <div className="flex items-center gap-2">

                          <span className="text-gray-400">
                            ₹
                          </span>

                          <input
                            type="number"
                            id="sale"
                            value={sale}
                            onChange={onChange}
                            min="0"
                            className="
                              w-full
                              bg-transparent
                              text-lg
                              font-semibold
                              text-amber-900
                              outline-none
                            "
                          />

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Inventory */}
                  <div>

                    <p className="mb-3 text-sm font-semibold text-gray-800">
                      Inventory
                    </p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                      {/* Category */}
                      <div>

                        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                          Category
                        </label>

                        <Select
                          required
                          options={options}
                          id="category"
                          value={catego}
                          onChange={categoryChange}
                          className="w-full"
                        />

                      </div>


                      {/* Quantity */}
                      <div>

                        <label
                          htmlFor="quantity"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500"
                        >
                          Quantity
                        </label>

                        <input
                          type="number"
                          id="quantity"
                          value={quantity}
                          onChange={onChange}
                          required
                          className="
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-[#fcfbf9]
                            px-4
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-amber-800
                            focus:bg-white
                          "
                        />

                      </div>


                      {/* SKU */}
                      <div>

                        <label
                          htmlFor="SKU"
                          className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500"
                        >
                          SKU
                        </label>

                        <input
                          type="text"
                          id="SKU"
                          value={SKU}
                          onChange={onChange}
                          required
                          className="
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-[#fcfbf9]
                            px-4
                            py-3
                            text-sm
                            outline-none
                            transition
                            focus:border-amber-800
                            focus:bg-white
                          "
                        />

                      </div>

                    </div>

                  </div>


                  {/* Short Description */}
                  <div>

                    <label
                      htmlFor="short_descrip"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Short Description
                    </label>

                    <textarea
                      id="short_descrip"
                      value={short_descrip}
                      onChange={onChange}
                      required
                      rows={3}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-[#fcfbf9]
                        px-4
                        py-3
                        text-sm
                        leading-6
                        outline-none
                        transition
                        focus:border-amber-800
                        focus:bg-white
                        focus:ring-2
                        focus:ring-amber-800/10
                      "
                    />

                  </div>


                  {/* Full Description */}
                  <div>

                    <label
                      htmlFor="full_descrip"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Full Description
                    </label>

                    <textarea
                      id="full_descrip"
                      value={full_descrip}
                      onChange={onChange}
                      required
                      rows={6}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-[#fcfbf9]
                        px-4
                        py-3
                        text-sm
                        leading-6
                        outline-none
                        transition
                        focus:border-amber-800
                        focus:bg-white
                        focus:ring-2
                        focus:ring-amber-800/10
                      "
                    />

                  </div>


                  {/* Actions */}
                  <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-end">

                    <button
                      id="close"
                      type="button"
                      onClick={handleOnChange}
                      className="
                        rounded-full
                        border
                        border-gray-300
                        bg-white
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-gray-700
                        transition
                        hover:border-gray-400
                        hover:bg-gray-50
                      "
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="
                        rounded-full
                        bg-[#211c17]
                        px-7
                        py-3
                        text-sm
                        font-semibold
                        tracking-wide
                        text-white
                        shadow-sm
                        transition-all
                        duration-200
                        hover:bg-amber-900
                        hover:shadow-lg
                        active:scale-[0.99]
                      "
                    >
                      Save Changes →
                    </button>

                  </div>

                </div>

              </section>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}