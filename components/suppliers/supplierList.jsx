"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const SupplierList = ({ supplierData }) => {
  const [paidAmount, setPaidAmount] = useState("");
  console.log("====================================");
  console.log(supplierData, "IO");
  console.log("====================================");

  return (
    <div className="scrollList flex w-full flex-col   px-2">
      <div className="flex flex-wrap">
        {supplierData?.map((data, key) => {
          let paid = data.financialTransactions
            .map((record) => record.payment)
            .reduce((total, payment) => total + payment, 0);
          let total = data.stockDetails
            .map((record) => record.price)
            .reduce((total, price) => total + price, 0);

          return (
            <Link
              className="m-2 lg:w-1/3 md:w-1/2 w-full"
              key={key}
              href={`/suppliers/${data._id}`}
            >
              <div className="">
                <div className="h-full flex items-center border-gray-200 bg-secondary border px-4 py-2 rounded-lg">
                  <div
                    className={`w-12 h-12 text-3xl text-[#fff] bg-primary flex justify-center items-center rounded-full mr-4 `}
                  >
                    {data.supplierName[0]}
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                      {data.supplierName}
                    </h2>
                    <div className="w-[50%] flex justify-between items-center">
                      <p className="text-[green] font-semibold">+₹{paid}</p>
                      <p className="text-[red] font-semibold">₹{total - paid}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SupplierList;
