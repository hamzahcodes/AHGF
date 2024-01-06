"use client";

import React, { useState, useEffect } from "react";
import Layout from "@components/ParentDrawer/Layout";
import AddItem from "@components/DeliveryNote/AddItem";
import DeliveryNotes from "@components/DeliveryNote/DeliveryNotes";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {

  const { data: session } = useSession()
  if(!session?.user?.id) redirect("/login")
  
  const [isClient, setIsClient] = useState(false);
  const [description, setDescription] = useState([]);
  const [itemPayload, setItemPayload] = useState({
    desc: "",
    quantity: 0,
    price: 0,
  });

  const [buyerDetails, setBuyerDetails] = useState({
    deliveredTo: "",
    phone: 0,
    address: "",
    shippingDate: new Date().toLocaleDateString("en-IN"),
    expectedDateToReach: new Date().toLocaleDateString("en-IN"),
  });

  const handleBuyerDetailsChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBuyerDetails({ ...buyerDetails, [name]: value });
  };

  const handleItemPayloadChange = (newItemPayload) => {
    setItemPayload(newItemPayload);
  };

  const handleModal = (e) => {
    e.preventDefault();

    console.log(itemPayload);
    if (!itemPayload.desc || !itemPayload.quantity || !itemPayload.price) {
      alert("All fields are required!");
      return;
    }

    setDescription([...description, itemPayload]);
    setItemPayload({ desc: "", quantity: 0, price: 0 });
    document.getElementById("addItemModal").close();
    alert("Item added successfully");
  };

  const handlePrintDeliveryNote = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="w-100 p-5 pb-10 border-2 border-x-indigo-400 border-y-indigo-500">
        {/* <PDFViewer className='fixed w-full h-full z-[5]'>
            <DeliveryNotes tableDetails={itemPayload} buyerDetails={buyerDetails}/>
        </PDFViewer>  */}
        <h2 className="text-center mb-3">DELIVERY NOTE</h2>
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/3 px-3 my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Delivered To
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="deliveredTo"
                value={buyerDetails.deliveredTo}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>

            <div className="w-full md:w-1/3 px-3 my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="phone"
                value={buyerDetails.phone !== 0 ? buyerDetails.phone : ""}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>

            <div className="w-full md:w-1/3 px-3 my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="address"
                value={buyerDetails.address}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Date Dispatched
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                name="shippingDate"
                value={buyerDetails.shippingDate}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>

            <div className="w-full md:w-1/2 px-3 my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Expected Delivery Date
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                name="expectedDateToReach"
                value={buyerDetails.expectedDateToReach}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>
          </div>
          </form>

        <div className="flex justify-around items-center p-3 bg-gray-50 border border-gray-400 w-full rounded-lg my-4">
          <h2>Items List</h2>
          <button
            onClick={() => document.getElementById("addItemModal").showModal()}
            className="input input-bordered w-24 md:w-auto text-sm bg-secondary text-white"
          >
            Add Item
          </button>
          <AddItem
            handleModal={handleModal}
            itemPayload={itemPayload}
            handleItemPayloadChange={handleItemPayloadChange}
          />
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {description.map((item) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.desc}
                    </th>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4">{item.quantity * item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-center items-center mt-10 p-4">
          {isClient && (
            <PDFDownloadLink
              className="bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]"
              document={
                <DeliveryNotes
                  buyerDetails={buyerDetails}
                  tableDetails={description}
                />
              }
              fileName={`${buyerDetails.deliveredTo}_deliverynote.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Delivery Note"
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
