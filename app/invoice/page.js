"use client";

import React, { useState, useEffect } from "react";
import Layout from "@components/ParentDrawer/Layout";
import AddItemInvoice from "@components/Invoice/AddItemInvoice";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const page = () => {
  const InvoicePdf = dynamic(
    () => import("../../components/Invoice/InvoicePdf"),
    {
      loading: () => (
        <button className="bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]">
          Loading...
        </button>
      ),
    }
  );

  const { data: session } = useSession();
  if (!session?.user?.id) redirect("/login");

  const [isGenerated, setIsGenerated] = useState(false);
  const [description, setDescription] = useState([]);
  const [itemPayload, setItemPayload] = useState({
    desc: "",
    quantity: 0,
    price: 0,
  });

  const [buyerDetails, setBuyerDetails] = useState({
    billTo: "",
    phone: 0,
    shippingDate: new Date().toLocaleDateString("en-IN"),
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
    document.getElementById("addItemInvoiceModal").close();
    alert("Item added successfully");
  };

 
  return (
    <div className="w-95 p-5 pb-10 border-2 bg-white my-2 rounded-md ">
      {/* <PDFViewer className='fixed w-full h-full z-[5]'>
            <DeliveryNotes tableDetails={itemPayload} buyerDetails={buyerDetails}/>
        </PDFViewer>  */}
      <h2 className="text-center mb-3 text-2xl">Invoice</h2>
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/3 px-3 my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Bill To
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
              type="text"
              name="billTo"
              value={buyerDetails.billTo}
              onChange={handleBuyerDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/3 px-3 my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Phone
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="number"
              name="phone"
              value={buyerDetails.phone !== 0 ? buyerDetails.phone : ""}
              onChange={handleBuyerDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/3 px-3 my-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Date
            </label>
            <input
              className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              type="date"
              name="shippingDate"
              value={buyerDetails.shippingDate}
              onChange={handleBuyerDetailsChange}
            ></input>
          </div>
        </div>
      </form>
      <div className="flex justify-around items-center p-3 bg-gray-100 border border-gray-400 w-full rounded-lg my-4">
        <h2 className="text-gray-900">Items List</h2>
        <button
          onClick={() =>
            document.getElementById("addItemInvoiceModal").showModal()
          }
          // className="input input-bordered w-24 md:w-auto text-sm bg-secondary text-white"
          className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] "

        >
          Add Item
        </button>
        <AddItemInvoice
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
          <InvoicePdf buyerDetails={buyerDetails} tableDetails={description} />
        ) : (
          <button
            className="bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]"
            onClick={() => setIsGenerated(true)}
          >
            Generate
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
