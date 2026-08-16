import axios from "axios";
import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import GallaryImgShow from "../../component/Admin_Comp/GallaryImgShow";
import ImgInput from "../../component/Admin_Comp/ImgInput";
import ImgShow from "../../component/Admin_Comp/ImgShow";
import Sidebar from "../../component/Admin_Comp/Sidebar/Sidebar";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [isLoadding, setIsLoadding] = useState(false);
  const [{ product, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  // const [imgURL, setImgURL] = useState(null);
  // const [gal_1_imgURL, setGal_1_ImgURL] = useState(null);
  // const [gal_2_imgURL, setGal_2_ImgURL] = useState(null);
  // const [gal_3_imgURL, setGal_3_ImgURL] = useState(null);
  let [formData, setFormData] = useState({
    item_name: "",
    sale: 0,
    price: 0,
    category: "",
    quantity: 1,
    cartORadd: "cart",
    SKU: "",
    short_descrip: "",
    full_descrip: "",
  });
  const {
    item_name,
    sale,
    price,
    category,
    images,
    quantity,
    SKU,
    short_descrip,
    full_descrip,
    gal_1_imgURL,
    gal_2_imgURL,
    gal_3_imgURL,
    image,
  } = formData;

  const options = [
    { value: "Chair", label: "Chair" },
    { value: "Table", label: "Table" },
    { value: "Bed", label: "Bed" },
    { value: "Closet", label: "Closet" },
    { value: "Sofa", label: "Sofa" },
    { value: "Kitchen", label: "Kitchen" }
  ];
  const [catego, setCatego] = useState(null);

const categoryChange = (value) => {
  setCatego(value);

  setFormData((prevState) => ({
    ...prevState,
    category: value?.value || "",
  }));
};
  console.log(catego);
  function onChange(e) {
    if (!e.target.files) {
      console.log("yooh");
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  }
  // formData = {
  //   ...formData,
  //   category: foods?.value || "",
  //   cartORadd: "cart",
  //   quantity:1, // If no foods is selected, default to an empty string
  // };

  console.log(formData);
  async function uploadImage(e) {
    setIsLoadding(true);

    const image = e.target.files[0];

    if (!image) {
      setIsLoadding(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("image", image);

      const response = await axios.post(
        `${import.meta.env.VITE_LINK}/upload`,
        data
      );

      console.log("Upload response:", response.data);

      const imageUrl = response.data.data.secure_url;

      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: imageUrl,
      }));

      console.log("Image uploaded successfully:", imageUrl);
      console.log("Form field updated:", e.target.id);
    } catch (error) {
      console.error("Image upload failed:", error);

      console.error(
        "Server response:",
        error.response?.data || "No server response"
      );
    } finally {
      setIsLoadding(false);
    }
  }

  function deletImage(e) {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));

    // try {
    //   console.log("successfully");
    //   console.log(imgDeleteURL);
    //   console.log(imgDeleteURL);
    //   const response = await axios.delete(imgDeleteURL);
    //   console.log("Image deleted successfully");
    //   console.log(response);
    // } catch (error) {
    //   // console.error("Failed to delete the image:", error);
    //   console.log(error);
    // }
  }
  function deletgal_3_imgURL(e) {
    setFormData((prevState) => ({
      ...prevState,
      gal_3_imgURL: null,
    }));
  }
  function deletgal_2_imgURL(e) {
    setFormData((prevState) => ({
      ...prevState,
      gal_2_imgURL: null,
    }));
  }
  function deletgal_1_imgURL(e) {
    setFormData((prevState) => ({
      ...prevState,
      gal_1_imgURL: null,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (sale > price) {
      toast.error("Selling price should be lower than the regular price");
    } else if (!image) {
      toast.error("You have to choose featured image!");
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_LINK}/products`,
          formData
        );
        console.log(response.data.product);
        // setData(response.data.product);
        // toast.success("Product added succesfully..!");
        dispatch({
          type: actionType.UPDATE_PRODUCTS,
          updateProd: true,
        });
        toast.success("New Product Added.");
        setFormData((prevState) => ({
          ...prevState,
          item_name: "",
          sale: 0,
          price: 0,
          category: "",
          quantity: 1,
          cartORadd: "cart",
          SKU: "",
          short_descrip: "",
          full_descrip: "",
          gal_1_imgURL: null,
          gal_2_imgURL: null,
          gal_3_imgURL: null,
          image: null,
        }));
        // localStorage.setItem("product", JSON.stringify(response.data.product));
        // const { user, token } = response.data;
        // console.log(user);
        // console.log(token);
        // dispatch({
        //   type: actionType.REGISTER_USER_SUCCESS,
        //   user: user,
        //   token: token,
        // });
        // localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("token", token);
      } catch (err) {
        const responseText = err.response.data;

        console.log(responseText);
        toast.error(responseText.msg);
        console.log(err);
      }
    }
  }

return (
  <div className="min-h-screen bg-[#f5f3ef] text-gray-900">

    {/* =========================================================
        ADMIN LAYOUT
    ========================================================== */}
    <div className="flex w-full">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <div className="border-b border-[#e5dfd6] bg-[#faf9f7]">

          <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10">

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
                  Product Management
                </p>

                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  Add Product
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Add a new piece to the Vanam Furnitures collection.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                      navigate("/admin/products")
                    }
                className="
                  w-fit
                  rounded-full
                  border
                  border-gray-300
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-gray-700
                  transition
                  hover:border-amber-800
                  hover:text-amber-900
                "
              >
                View Products → 
              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            CONTENT
        ====================================================== */}
        <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10 lg:py-8">

          <form onSubmit={onSubmit}>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">


              {/* =================================================
                  LEFT : IMAGE STUDIO
              ================================================== */}
              <section className="rounded-[1.75rem] border border-[#e5dfd6] bg-white p-5 shadow-sm">

                {/* Section Header */}
                <div className="mb-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                    Product Media
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Product Images
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Add a featured image and supporting gallery images.
                  </p>

                </div>


                {/* Featured Image */}
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


                  <div className="
                    relative
                    flex
                    h-[430px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-dashed
                    border-[#d9d1c6]
                    bg-[#f8f6f2]
                  ">

                    <div
                      id="image"
                      className="h-full w-full rounded-2xl"
                    >
                      {image ? (
                        <ImgShow
                          id="image"
                          imgURL={image}
                          deletImage={deletImage}
                        />
                      ) : (
                        <ImgInput
                          id="image"
                          uploadImage={uploadImage}
                        />
                      )}

                      {isLoadding && (
                        <div className="
                          absolute
                          inset-0
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

                </div>


                {/* Gallery */}
                <div className="mt-6">

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-sm font-semibold text-gray-800">
                      Gallery
                    </p>

                    <span className="text-[10px] text-gray-400">
                      Up to 3 images
                    </span>

                  </div>


                  <div className="grid grid-cols-3 gap-3">

                    {/* Gallery 1 */}
                    <div className="
                      aspect-square
                      overflow-hidden
                      rounded-xl
                      border
                      border-dashed
                      border-[#d9d1c6]
                      bg-[#f8f6f2]
                    ">
                      {gal_1_imgURL ? (
                        <GallaryImgShow
                          id="gal_1_imgURL"
                          imgURL={gal_1_imgURL}
                          deletImage={deletgal_1_imgURL}
                        />
                      ) : (
                        <ImgInput
                          id="gal_1_imgURL"
                          uploadImage={uploadImage}
                        />
                      )}
                    </div>


                    {/* Gallery 2 */}
                    <div className="
                      aspect-square
                      overflow-hidden
                      rounded-xl
                      border
                      border-dashed
                      border-[#d9d1c6]
                      bg-[#f8f6f2]
                    ">
                      {gal_2_imgURL ? (
                        <GallaryImgShow
                          id="gal_2_imgURL"
                          imgURL={gal_2_imgURL}
                          deletImage={deletgal_2_imgURL}
                        />
                      ) : (
                        <ImgInput
                          id="gal_2_imgURL"
                          uploadImage={uploadImage}
                        />
                      )}
                    </div>


                    {/* Gallery 3 */}
                    <div className="
                      aspect-square
                      overflow-hidden
                      rounded-xl
                      border
                      border-dashed
                      border-[#d9d1c6]
                      bg-[#f8f6f2]
                    ">
                      {gal_3_imgURL ? (
                        <GallaryImgShow
                          id="gal_3_imgURL"
                          imgURL={gal_3_imgURL}
                          deletImage={deletgal_3_imgURL}
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
                  RIGHT : PRODUCT DETAILS
              ================================================== */}
              <section className="rounded-[1.75rem] border border-[#e5dfd6] bg-white p-5 shadow-sm sm:p-7">

                {/* Section Header */}
                <div className="border-b border-gray-100 pb-5">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                    Product Information
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    Product Details
                  </h2>

                </div>


                <div className="mt-6 space-y-6">

                  {/* =================================================
                      PRODUCT NAME
                  ================================================== */}
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
                      placeholder="e.g. Classic Wooden Lounge Chair"
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
                        placeholder:text-gray-400
                        focus:border-amber-800
                        focus:bg-white
                        focus:ring-2
                        focus:ring-amber-800/10
                      "
                    />

                  </div>


                  {/* =================================================
                      PRICING
                  ================================================== */}
                  <div>

                    <div className="mb-2">
                      <p className="text-sm font-semibold text-gray-800">
                        Pricing
                      </p>
                    </div>

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
                            required
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


                  {/* =================================================
                      CATEGORY / STOCK / SKU
                  ================================================== */}
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
                          placeholder="VN-001"
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
                            placeholder:text-gray-400
                            focus:border-amber-800
                            focus:bg-white
                          "
                        />

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      SHORT DESCRIPTION
                  ================================================== */}
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
                      placeholder="A concise description customers will see first."
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
                        placeholder:text-gray-400
                        focus:border-amber-800
                        focus:bg-white
                        focus:ring-2
                        focus:ring-amber-800/10
                      "
                    />

                  </div>


                  {/* =================================================
                      FULL DESCRIPTION
                  ================================================== */}
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
                      rows={7}
                      placeholder="Describe the product, materials, style, dimensions and other relevant details."
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
                        placeholder:text-gray-400
                        focus:border-amber-800
                        focus:bg-white
                        focus:ring-2
                        focus:ring-amber-800/10
                      "
                    />

                  </div>


                  {/* =================================================
                      ACTION BAR
                  ================================================== */}
                  <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Ready to publish?
                      </p>

                      <p className="mt-1 text-[11px] text-gray-400">
                        Make sure all product information is correct.
                      </p>
                    </div>


                    <button
                      type="submit"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        bg-[#211c17]
                        px-7
                        py-3
                        text-sm
                        font-semibold
                        tracking-wide
                        text-white
                        shadow-md
                        transition-all
                        duration-200
                        hover:bg-amber-900
                        hover:shadow-lg
                        active:scale-[0.99]
                      "
                    >
                      Add Product →
                    </button>

                  </div>

                </div>

              </section>

            </div>

          </form>

        </div>

      </main>

    </div>
  </div>
);
}
