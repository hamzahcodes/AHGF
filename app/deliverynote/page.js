"use client";

import React, { useState } from "react";
import Layout from "@components/ParentDrawer/Layout";
import AddItem from "@components/DeliveryNote/AddItem";
import DeliveryNotes from "@components/DeliveryNote/DeliveryNotes";
import { PDFViewer } from '@react-pdf/renderer';

const page = () => {
  const [description, setDescription] = useState([]);
  const [itemPayload, setItemPayload] = useState({
    desc: "",
    quantity: 0,
    price: 0,
  });

  const [ buyerDetails, setBuyerDetails ] = useState({
    deliveredTo: "",
    phone: 0,
    address: "",
    shippingDate: new Date(),
    expectedDateToReach: new Date()
  });

  const handleBuyerDetailsChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBuyerDetails({ ...buyerDetails, [name]: value })
  }

  const handleItemPayloadChange = (newItemPayload) => {
    setItemPayload(newItemPayload)
  }

  const handleModal = (e) => {
    e.preventDefault();

    console.log(itemPayload);
    if(!itemPayload.desc || !itemPayload.quantity || !itemPayload.price) {
      alert("All fields are required!")
      return;
    }

    setDescription([...description, itemPayload])
    setItemPayload({desc: "", quantity: 0, price: 0})
    document.getElementById("addItemModal").close();
    alert("Item added successfully");
  };

  const handlePrintDeliveryNote = (e) => {
    e.preventDefault();

    alert("Sabr kar Bhai!!!");

     
  };

  return (
    <Layout>
      <div className="w-100 p-5 pb-10 border-2 border-x-indigo-400 border-y-indigo-500">
      {/* <PDFViewer className='fixed w-full h-full z-[5]'>
            <DeliveryNotes />
        </PDFViewer>  */}
        <h2 className="text-center mb-3">DELIVERY NOTE</h2>
        <form className="w-full">
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/3 px-3 my-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Delivered To
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="deliveredTo"
                value={buyerDetails.deliveredTo}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>

            <div className="w-full md:w-1/3 px-3 my-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Phone
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="number"
                name="phone"
                value={buyerDetails.phone !== 0 ? buyerDetails.phone : ''}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>

            <div className="w-full md:w-1/3 px-3 my-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Address
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="address"
                value={buyerDetails.address}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 my-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Date Dispatched
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                type="date"
                name="shippingDate"
                value={buyerDetails.shippingDate}
                onChange={handleBuyerDetailsChange}
              ></input>
            </div>

            <div className="w-full md:w-1/2 px-3 my-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Expected Delivery Date
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-last-name"
                type="date"
                placeholder="Doe"
              ></input>
            </div>
          </div>

          <div>
            <h2>Items List</h2>

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
                {console.log(description)}
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
                )})}
              </tbody>
            </table>
          </div>

        </form>


        <div className="w-full flex justify-center items-center mt-10">
          <button
            className="bg-primary rounded-md text-[#fff] p-4"
            onClick={handlePrintDeliveryNote}
          >
            Print Delivery Note
          </button>
        </div>
      </div>
      <button
            onClick={() => document.getElementById("addItemModal").showModal()}
            className="text-md fixed bottom-[10%] right-[5%] p-4 rounded-full bg-accent text-[#fff]"
          >
            Add Item
      </button>
      <AddItem handleModal={handleModal} itemPayload={itemPayload} handleItemPayloadChange={handleItemPayloadChange} />
    </Layout>
  );
};

export default page;
