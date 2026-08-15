import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import ReactStar from "react-rating-stars-component";
import { toast } from "react-toastify";
import axios from "axios";
import Review from "../../component/Home/Review";
import { actionType } from "../../context/reducer";
import Add_To_Cart from "../../component/Shop/Add_To_Cart";

export default function SingleItem() {
  const [{product, cartShow, cartItems, user }, dispatch] = useStateValue();
  const [singleData, setSingleData] = useState(product);
  const [view, setView] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [displayImage, setDisplayIamge] = useState(null);
  const { id } = useParams();
  console.log(id);
console.log(user)
  let [formData, setFormData] = useState({
    item_id: id,
    user_id: user?._id || user?.id || "",
    user_name: user?.name || "",
    user_pic: user?.image || "https://i.ibb.co/gTnHqRV/pngegg.png",
    rating: 0,
    review: "",
    date: 0,
  });

  useEffect(() => {
    const foundItem = product.find((item) => item._id === id);
    //   selectedFoodRef.current = foundItem;
    console.log(product)
    console.log(foundItem);
    setDisplayIamge(foundItem.image)
    setSingleData(foundItem);
  }, []);

  const changing_DisplayImage = (e)=> {
    
    console.log(e.target.id)
    let temp;
    if(e.target.id === "gal_1_imgURL")
    {
      temp=singleData.gal_1_imgURL
      singleData.gal_1_imgURL=displayImage
    }
    else if(e.target.id === "gal_2_imgURL")
    {
      temp=singleData.gal_2_imgURL
      singleData.gal_2_imgURL=displayImage
    }
    else if(e.target.id === "gal_3_imgURL")
    {
      temp=singleData.gal_3_imgURL
      singleData.gal_3_imgURL=displayImage
    }
    setDisplayIamge(temp)
    
  }
  const { review, rating, user_id, item_id } = formData;

  console.log(formData);

  async function onSubmit(e) {
    e.preventDefault();

    // Ensure all required fields are provided
    if (!item_id || !user_id || !rating || !review) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LINK}/products/createreview`,
        formData
      );
      console.log(response.singleData);
      toast.success("Create a review successfully.");
    } catch (error) {
      console.error(error.response.singleData);
      toast.error("Failed to create a review. Please try again.");
    }
  }

  const ratingChanged = (newRating) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: newRating || 0,
      date: new Date().toISOString(),
    }));
  };

  function onChange(e) {
    console.log("holo ");
    setFormData((prevState) => ({
      ...prevState,
      review: e.target.value,
    }));
  }

  console.log(formData);
  console.log(singleData);
  console.log(user);


return (
  <div className="min-h-screen bg-white text-gray-900">
    {/* ================= PRODUCT SECTION ================= */}
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
        
        {/* ================= IMAGE AREA ================= */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          
          {/* Gallery Thumbnails */}
          <div className="flex shrink-0 gap-3 sm:w-24 sm:flex-col">
            {singleData.gal_1_imgURL && (
              <button
                type="button"
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-gray-50 p-1 transition-all duration-200 hover:border-gray-500 sm:h-24 sm:w-24 ${
                  displayImage === singleData.gal_1_imgURL
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={singleData.gal_1_imgURL}
                  id="gal_1_imgURL"
                  onClick={changing_DisplayImage}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              </button>
            )}

            {singleData.gal_2_imgURL && (
              <button
                type="button"
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-gray-50 p-1 transition-all duration-200 hover:border-gray-500 sm:h-24 sm:w-24 ${
                  displayImage === singleData.gal_2_imgURL
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={singleData.gal_2_imgURL}
                  id="gal_2_imgURL"
                  onClick={changing_DisplayImage}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              </button>
            )}

            {singleData.gal_3_imgURL && (
              <button
                type="button"
                className={`h-20 w-20 overflow-hidden rounded-xl border-2 bg-gray-50 p-1 transition-all duration-200 hover:border-gray-500 sm:h-24 sm:w-24 ${
                  displayImage === singleData.gal_3_imgURL
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={singleData.gal_3_imgURL}
                  id="gal_3_imgURL"
                  onClick={changing_DisplayImage}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              </button>
            )}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={displayImage}
                alt={singleData.item_name}
                className="h-full w-full object-contain p-4 transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* ================= PRODUCT INFORMATION ================= */}
        <div className="flex flex-col justify-center">
          <div className="border-b border-gray-200 pb-7">
            
            {/* Product Name */}
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              {singleData.item_name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>

              <span className="text-sm text-gray-500">
                Ratings
              </span>
            </div>

            {/* Short Description */}
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              {singleData.short_descrip}
            </p>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <p className="text-3xl font-bold text-gray-900">
                ₹ {singleData.sale}
              </p>

              <p className="pb-1 text-lg text-gray-400 line-through">
                ₹ {singleData.price}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

              <p className="text-sm font-medium text-gray-600">
                {singleData.quantity > 0
                  ? `In stock: ${singleData.quantity}`
                  : "Out of stock"}
              </p>
            </div>
          </div>

          {/* Quantity + Cart */}
          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              Quantity
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              
              {/* Quantity Selector */}
              <div className="flex h-12 w-fit items-center overflow-hidden rounded-lg border border-gray-300">
                <button
                  type="button"
                  className="flex h-full w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  −
                </button>

                <div className="flex h-full min-w-12 items-center justify-center border-x border-gray-300 px-3 text-base font-semibold">
                  {quantity}
                </div>

                <button
                  type="button"
                  className="flex h-full w-12 items-center justify-center text-xl text-gray-600 transition hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              {/* Add To Cart */}
              <div className="w-full sm:w-auto">
                <Add_To_Cart
                  data={singleData}
                  quantity={quantity}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ================= DESCRIPTION / REVIEWS ================= */}
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200">
          <button
            type="button"
            className={`pb-4 text-base font-semibold transition ${
              view === "description"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setView("description")}
          >
            Description
          </button>

          <button
            type="button"
            className={`pb-4 text-base font-semibold transition ${
              view === "review"
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setView("review")}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl pt-7">
          {view === "description" ? (
            <p className="text-base leading-8 text-gray-600">
              {singleData.full_descrip}
            </p>
          ) : (
            <Review item_id={formData.item_id} />
          )}
        </div>
      </div>
    </section>

    {/* ================= LEAVE REVIEW ================= */}
    <section
      className={`${
        user ? "block" : "hidden"
      } border-t border-gray-200 bg-white`}
    >
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          
          <h2 className="text-2xl font-semibold text-gray-900">
            Leave a Review
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Share your experience with this product.
          </p>

          {/* Rating */}
          <div className="mt-6">
            <ReactStar
              size={35}
              onChange={ratingChanged}
            />
          </div>

          {/* Review Form */}
          <form
            className="mt-6 flex flex-col gap-5"
            onSubmit={onSubmit}
          >
            <div>
              <label
                htmlFor="review"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Review
              </label>

              <textarea
                id="review"
                className="min-h-36 w-full resize-y rounded-xl border border-gray-300 bg-white p-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                placeholder="Write your review..."
                onChange={onChange}
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
);
}
