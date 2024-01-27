"use client";


import React, {  useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllStocks } from "@helper/http";

import StockList from "@components/stocks/stockList";
import LoadingSpinner from "@components/ui/loadingSpinner";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
const Page = () => {
  const { data: session } = useSession();
  if (!session?.user?.id) redirect("/login");


  const [isGenerated, setIsGenerated] = useState(false);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => getAllStocks(),
  });

  const StockPdf = dynamic(() => import("../../components/stocks/StockPdf"), {
    loading: () => (
      <button className="bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]">
        Loading...
      </button>
    ),
  });

  return (
    <>
      <div className="flex justify-center items-center py-7">
        {isGenerated ? (
          <StockPdf stockData={data} />
        ) : (
          <button
            className="bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]"
            onClick={() => setIsGenerated(true)}
          >
            Generate
          </button>
        )}
      </div>
      {data ? <StockList stockData={data} /> : <LoadingSpinner />}
    </>
  );
};

export default Page;
