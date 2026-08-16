import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiPackage,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../component/Admin_Comp/Sidebar/Sidebar";
import Toggle_button from "../../component/Admin_Comp/Toggle_button";
import EditProduct from "../../component/Admin_Comp/EditProduct";
import DeleteProduct from "../../component/Admin_Comp/DeleteProduct";

import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export default function All_Products() {
  const [{ product, updateProd }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const [data, setData] = useState(product || []);

  const [editprod, setEditprod] = useState(false);
  const [deleteprod, setDeleteprod] = useState(false);

  const [editedData, setEditedData] = useState(null);

  const [visible, setVisible] = useState(false);
  const [delvisible, setDelvisible] = useState(false);

  const [updateFeature, setUpdateFeature] = useState(false);

  /* =========================================================
      KEEP LOCAL DATA IN SYNC
  ========================================================= */
  useEffect(() => {
    setData(product || []);
  }, [product]);

  /* =========================================================
      FETCH PRODUCTS
  ========================================================= */
  async function onSubmit() {
    if (!data || updateFeature || updateProd) {
      try {
        dispatch({
          type: actionType.UPDATE_PRODUCTS,
          updateProd: false,
        });

        const response = await axios.get(
          `${import.meta.env.VITE_LINK}/products`
        );

        const products = response?.data?.product || [];

        setData(products);

        dispatch({
          type: actionType.SET_PRODUCTS,
          product: products,
        });

        localStorage.setItem(
          "product",
          JSON.stringify(products)
        );
      } catch (err) {
        const responseText = err?.response?.data;

        console.error(responseText);

        toast.error(
          responseText?.msg || "Unable to load products"
        );
      }
    }
  }

  useEffect(() => {
    onSubmit();
  }, []);

  /* =========================================================
      EDIT MODAL
  ========================================================= */
  function onClose() {
    setVisible((prev) => !prev);
  }

  const edited = (itemdata) => {
    setEditedData(itemdata);
  };

  /* =========================================================
      DELETE MODAL
  ========================================================= */
  function delonClose() {
    setDelvisible((prev) => !prev);
  }

  /* =========================================================
      FEATURED PRODUCT TOGGLE
  ========================================================= */
  async function toggle_Switch(id) {
    try {
      const currentProduct = data.find(
        (item) => item._id === id
      );

      if (!currentProduct) {
        toast.error("Product not found");
        return;
      }

      const featureProductValue = {
        feature_product: !currentProduct.feature_product,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_LINK}/products/${id}`,
        featureProductValue
      );

      console.log(response);

      setUpdateFeature((prev) => !prev);

      setData((prevData) =>
        prevData.map((item) =>
          item._id === id
            ? {
                ...item,
                feature_product: !item.feature_product,
              }
            : item
        )
      );

    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to update product feature status"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-gray-900">

      {/* =====================================================
          ADMIN LAYOUT
      ====================================================== */}
      <div className="flex min-h-screen w-full">

        <Sidebar />

        <main className="min-w-0 flex-1">

          {/* =================================================
              PAGE HEADER
          ================================================== */}
          <header className="border-b border-[#e5dfd6] bg-[#faf9f7]">

            <div className="mx-auto max-w-[1550px] px-5 py-6 sm:px-7 lg:px-10">

              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

                {/* Heading */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-800">
                    Product Management
                  </p>

                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    Products
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    Manage your Vanam Furnitures collection.
                  </p>
                </div>

                {/* Stats + Add */}
                <div className="flex flex-wrap items-center gap-3">

                  <div className="flex items-center gap-2 rounded-full border border-[#e5dfd6] bg-white px-4 py-2.5 shadow-sm">
                    <FiPackage className="text-amber-800" />

                    <span className="text-sm font-semibold text-gray-900">
                      {data.length}
                    </span>

                    <span className="text-xs text-gray-500">
                      Products
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/admin/products/addproducts")
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#211c17]
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-amber-900
                      hover:shadow-lg
                    "
                  >
                    <FiPlus />
                    Add Product
                  </button>

                </div>

              </div>

            </div>
          </header>


          {/* =================================================
              CONTENT
          ================================================== */}
          <section className="mx-auto max-w-[1550px] px-5 py-6 sm:px-7 lg:px-10 lg:py-8">

            {/* =================================================
                SUMMARY CARDS
            ================================================== */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Total */}
              <div className="rounded-2xl border border-[#e5dfd6] bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Total Products
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {data.length}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
                    <FiPackage />
                  </div>

                </div>
              </div>


              {/* Featured */}
              <div className="rounded-2xl border border-[#e5dfd6] bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Featured
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {
                        data.filter(
                          (item) => item.feature_product
                        ).length
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
                    ★
                  </div>

                </div>
              </div>


              {/* Categories */}
              <div className="rounded-2xl border border-[#e5dfd6] bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                      Categories
                    </p>

                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {
                        new Set(
                          data.map(
                            (item) => item.category
                          )
                        ).size
                      }
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3eee6] text-amber-900">
                    ◈
                  </div>

                </div>
              </div>

            </div>


            {/* =================================================
                TABLE
            ================================================== */}
            <div className="overflow-hidden rounded-[1.75rem] border border-[#e5dfd6] bg-white shadow-sm">

              {/* Table Header */}
              <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-800">
                    Product Directory
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-gray-900">
                    All Products
                  </h2>
                </div>

                <span className="text-xs text-gray-400">
                  {data.length} records
                </span>

              </div>


              {/* Empty State */}
              {data.length === 0 ? (

                <div className="flex min-h-[320px] items-center justify-center">

                  <div className="text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3eee6] text-amber-900">
                      <FiPackage className="text-xl" />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                      No products found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Add your first product to get started.
                    </p>

                  </div>

                </div>

              ) : (

                <div className="overflow-x-auto">

                  <table className="min-w-[1250px] w-full">

                    {/* =================================================
                        TABLE HEAD
                    ================================================== */}
                    <thead>

                      <tr className="border-b border-gray-100 bg-[#faf8f4]">

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Product
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Category
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Sale Price
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Regular Price
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Stock
                        </th>

                        <th className="px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Purchased
                        </th>

                        <th className="px-6 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Featured
                        </th>

                        <th className="px-6 py-4 text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Actions
                        </th>

                      </tr>

                    </thead>


                    {/* =================================================
                        TABLE BODY
                    ================================================== */}
                    <tbody className="divide-y divide-gray-100">

                      {data.map((item) => {

                        const salePrice = Number(item?.sale || 0);
                        const regularPrice = Number(item?.price || 0);
                        const quantityValue = Number(
                          item?.quantity || 0
                        );

                        return (
                          <tr
                            key={item?._id || item?.id}
                            className="group transition-colors duration-200 hover:bg-[#fcfaf7]"
                          >

                            {/* Product */}
                            <td className="px-6 py-5">

                              <div className="flex items-center gap-4">

                                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#f7f4ef]">

                                  {item?.image ? (
                                    <img
                                      src={item.image}
                                      alt={
                                        item?.item_name ||
                                        "Product"
                                      }
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                      No image
                                    </div>
                                  )}

                                </div>

                                <div className="min-w-0">

                                  <p className="max-w-[220px] truncate text-sm font-semibold text-gray-900">
                                    {item?.item_name || "Unnamed Product"}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400">
                                    SKU: {item?.SKU || "—"}
                                  </p>

                                </div>

                              </div>

                            </td>


                            {/* Category */}
                            <td className="px-6 py-5">

                              <span className="inline-flex rounded-full bg-[#f3eee6] px-3 py-1.5 text-xs font-semibold text-amber-900">
                                {item?.category || "—"}
                              </span>

                            </td>


                            {/* Sale Price */}
                            <td className="px-6 py-5">

                              <span className="text-sm font-semibold text-amber-900">
                                ₹ {salePrice}
                              </span>

                            </td>


                            {/* Regular Price */}
                            <td className="px-6 py-5">

                              <span
                                className={
                                  salePrice > 0 &&
                                  salePrice < regularPrice
                                    ? "text-sm text-gray-500 line-through"
                                    : "text-sm text-gray-500"
                                }
                              >
                                ₹ {regularPrice}
                              </span>

                            </td>


                            {/* Stock */}
                            <td className="px-6 py-5">

                              <span
                                className={`
                                  inline-flex
                                  rounded-full
                                  px-3
                                  py-1.5
                                  text-xs
                                  font-semibold
                                  ${
                                    quantityValue <= 0
                                      ? "bg-red-50 text-red-600"
                                      : quantityValue < 10
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-green-50 text-green-700"
                                  }
                                `}
                              >
                                {quantityValue} in stock
                              </span>

                            </td>


                            {/* Purchased */}
                            <td className="px-6 py-5">

                              <span className="text-sm text-gray-600">
                                {item?.purchasing_number ?? 0}
                              </span>

                            </td>


                            {/* Featured */}
                            <td className="px-6 py-5 text-center">

                              <div className="flex justify-center">

                                <Toggle_button
                                  enabled={item.feature_product}
                                  id={item._id}
                                  toggle_Switch={toggle_Switch}
                                />

                              </div>

                            </td>


                            {/* Actions */}
                            <td className="px-6 py-5">

                              <div className="flex items-center justify-end gap-2">

                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditprod(true);
                                    edited(item);
                                    setVisible(true);
                                  }}
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-gray-200
                                    bg-white
                                    text-gray-500
                                    transition
                                    hover:border-amber-800
                                    hover:bg-[#f7f2eb]
                                    hover:text-amber-900
                                  "
                                  title="Edit product"
                                >
                                  <FiEdit2 className="text-sm" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteprod(true);
                                    edited(item);
                                    setDelvisible(true);
                                  }}
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-gray-200
                                    bg-white
                                    text-gray-500
                                    transition
                                    hover:border-red-200
                                    hover:bg-red-50
                                    hover:text-red-600
                                  "
                                  title="Delete product"
                                >
                                  <FiTrash2 className="text-sm" />
                                </button>

                              </div>

                            </td>

                          </tr>
                        );
                      })}

                    </tbody>

                  </table>

                </div>
              )}

            </div>

          </section>

        </main>

      </div>


      {/* =========================================================
          MODALS
      ========================================================== */}

      {editprod && (
        <EditProduct
          item={editedData}
          onClose={onClose}
          visible={visible}
        />
      )}

      {deleteprod && (
        <DeleteProduct
          item={editedData}
          delonClose={delonClose}
          delvisible={delvisible}
        />
      )}

    </div>
  );
}