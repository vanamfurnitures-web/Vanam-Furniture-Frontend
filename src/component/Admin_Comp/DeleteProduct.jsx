import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';

export default function DeleteProduct({delvisible,delonClose,item}) {
  
  const [{}, dispatch] = useStateValue();
  
  
  const handleOnChange = (e) => {
        if (e.target.id === "cont" || e.target.id === "close") {
            delonClose();
        }
      };
console.log(item)
    async function onChange () {
        try {
            const response = await axios.delete(
              `${import.meta.env.VITE_LINK}/products/${item._id}`
            );
            console.log(response);

            dispatch({
              type: actionType.SET_PRODUCTS,
              product: response.data.product,
            });
            console.log(response.data.product)
            localStorage.setItem("product", JSON.stringify(response.data.product));

            toast.success("Product Deleted successfully..!")
            delonClose()
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
    
    
    if (!delvisible) return null;
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
      backdrop-blur-md
    "
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        w-full
        max-w-md
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[#e5dfd6]
        bg-[#faf9f7]
        shadow-2xl
      "
    >

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="bg-[#211c17] px-6 py-6 text-white sm:px-7">

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300">
              Product Management
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Delete Product
            </h2>
          </div>

          <button
            id="close"
            type="button"
            onClick={handleOnChange}
            className="
              flex
              h-9
              w-9
              flex-shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-lg
              text-gray-200
              transition
              hover:bg-white/20
              hover:text-white
            "
          >
            ×
          </button>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="px-6 py-7 sm:px-7">

        <div className="flex items-start gap-4">

          {/* Warning Icon */}
          <div className="
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-50
            text-red-600
          ">
            !
          </div>


          {/* Message */}
          <div className="min-w-0">

            <h3 className="text-base font-semibold text-gray-900">
              Are you sure?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You are about to permanently delete this product.
              This action cannot be undone.
            </p>

          </div>

        </div>


        {/* Product Preview */}
        {item && (
          <div className="
            mt-6
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-[#e5dfd6]
            bg-white
            p-4
          ">

            <div className="
              h-14
              w-14
              flex-shrink-0
              overflow-hidden
              rounded-xl
              bg-[#f3eee6]
            ">
              {item?.image ? (
                <img
                  src={item.image}
                  alt={item?.item_name || "Product"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-gray-900">
                {item?.item_name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {item?.category || "Product"}
              </p>

            </div>

          </div>
        )}


        {/* =================================================
            ACTIONS
        ================================================== */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            id="close"
            type="button"
            onClick={handleOnChange}
            className="
              w-full
              rounded-full
              border
              border-gray-300
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:border-gray-400
              hover:bg-gray-50
              sm:w-auto
            "
          >
            Keep Product
          </button>

          <button
            type="button"
            onClick={onChange}
            className="
              w-full
              rounded-full
              bg-red-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-red-700
              hover:shadow-md
              active:scale-[0.99]
              sm:w-auto
            "
          >
            Delete Product
          </button>

        </div>

      </div>

    </div>
  </div>
);
}
