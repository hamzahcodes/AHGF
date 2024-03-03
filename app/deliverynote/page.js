"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Layout from "@components/ParentDrawer/Layout";
import AddItem from "@components/DeliveryNote/AddItem";
// import DeliveryNotes from "../../components/DeliveryNote/DeliveryNotes";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const [isGenerated, setIsGenerated] = useState(false);

  const { data: session } = useSession()
  if(!session?.user?.id) redirect("/login")
  

  const [description, setDescription] = useState([]);
  const [itemPayload, setItemPayload] = useState({
    desc: "",
    quantity: 0,
    price: 0,
  });

   const DeliveryNotes = dynamic(() => import("../../components/DeliveryNote/DeliveryNotes"), {
    loading: () => (
      <button
       
        className="bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]"
      >
        Loading...
      </button>
    ),
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


  return (
    <>
      <div className="w-100 p-5 pb-10 border-2 bg-white">
        {/* <PDFViewer className='fixed w-full h-full z-[5]'>
            <DeliveryNotes tableDetails={itemPayload} buyerDetails={buyerDetails}/>
        </PDFViewer>  */}
        <h2 className="text-center mb-3 text-2xl">DELIVERY NOTE</h2>
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/3 px-3 my-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Delivered To
              </label>
              <input
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="date"
                name="expectedDateToReach"
                value={buyerDetails.expectedDateToReach}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>
          </div>
        </form>

        <div className="flex justify-around items-center p-3 bg-gray-100 border border-gray-400 w-full rounded-lg my-4">
          <h2 className="text-gray-900">Items List</h2>
          <button
            onClick={() => document.getElementById("addItemModal").showModal()}
            className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] "
          >
            Add Item
          </button>
          <AddItem
            handleModal={handleModal}
            itemPayload={itemPayload}
            handleItemPayloadChange={handleItemPayloadChange}
          />
        </div>

        {description.length !== 0 && 
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-400 bg-gray-100">
          <table className="bg-gray-100 w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Description
                </th>
                <th scope="col" className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {description.map((item) => {
                return (
                  <tr className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
        </div> }

        <div className="w-full flex justify-center items-center mt-10 p-4">
          {isGenerated ? (
            <DeliveryNotes
              buyerDetails={buyerDetails}
              tableDetails={description}
            />
          ) : (
            <button onClick={() => {setIsGenerated(true)}} className="bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]">
              Generate Document
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
