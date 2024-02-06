"use client";


import React, {  useState} from "react";

import StockList from "@components/suppliers/stockList";
import LoadingSpinner from "@components/ui/loadingSpinner";
import { getSupplierById } from "@helper/http";
import { useQuery } from "@tanstack/react-query";

import SupplierTransactionList from "@components/suppliers/supplierTransactionList";
import SupplierStats from "@components/suppliers/supplierStats";

const SupplierId = ({ params }) => {

  const [activeTab, setActiveTab] = useState(0);
 

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["supplier"],
    queryFn: () => getSupplierById({ id: params.supplierId }),
  });

  console.log(data);
  let total =
    data &&
    data[0].stockDetails
      ?.map((record) => record.price)
      .reduce((total, price) => total + price, 0);
  let paymentMade =
    data &&
    data[0].financialTransactions
      ?.map((record) => record.payment)
      .reduce((total, payment) => total + payment, 0);

  return (
    <>
      {console.log(total, paymentMade)}
      {data ? (
        <>
          <SupplierStats
            supplierData={data}
            total={total}
            paymentMade={paymentMade}
          />

          <div>
            <div className="tabs tabs-boxed w-auto mx-2 my-2">
              <div
                onClick={() => {
                  setActiveTab(0);
                }}
                className={`tab w-[50%] ${!activeTab ? "bg-primary text-[#fff]" : "text-[#000]"}`}
              >
                Transaction Details
              </div>
              <div
                onClick={() => {
                  setActiveTab(1);
                }}
                className={`tab w-[50%] ${activeTab ? "bg-primary text-[#fff]" : "text-[#000]"}`}
              >
                Stock Specifities
              </div>
            </div>
          </div>

          {activeTab ? (
            // goat list to be changed with stock list
            <StockList
              data={data && data[0].stockDetails}
              id={params.supplierId}
            />
          ) : (
            <SupplierTransactionList
              data={data && data[0].financialTransactions}
              id={params.supplierId}
            />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default SupplierId;
