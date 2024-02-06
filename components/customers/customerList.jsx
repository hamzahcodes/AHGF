import React, { useState, useEffect } from "react";
import Link from "next/link";
const CustomerList = ({ customerData }) => {
  const [paidAmount, setPaidAmount] = useState("");

  return (
    <div className="scrollList flex w-full flex-col   px-2">
      <div className="flex flex-wrap">
        {customerData?.map((data, key) => {
          let paid = data.financial_details
            .map((record) => record.amount)
            .reduce((total, amount) => total + amount, 0);
          let total = data.goat_details
            .map((record) => record.total_amount)
            .reduce((total, amount) => total + amount, 0);

          return (
            <Link
              className="m-2 lg:w-1/3 md:w-1/2 w-full"
              key={key}
              href={`/customers/${data._id}`}
            >
              <div className="">
                <div className="h-full flex items-center border-gray-200 bg-secondary border px-4 py-2 rounded-lg">
                  <div
                    className={`w-12 h-12 text-3xl text-[#fff] bg-primary flex justify-center items-center rounded-xl  mr-4 `}
                  >
                    {data.basic_details.username[0]}
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 title-font font-medium">
                      {data.basic_details.username}
                    </h2>
                    <div className="w-[60%] flex justify-between items-center">
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

export default CustomerList;
