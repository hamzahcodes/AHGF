"use client";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomersSuppliers } from "@helper/http";
import Link from "next/link";
import LoadingSpinner from "@components/ui/loadingSpinner";

const page = () => {
  const clearInput = useRef();
  const [searchList, setSearchList] = useState([]);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["customers_suppliers"],
    queryFn: () => getCustomersSuppliers(),
  });

  let flag = true,
    deTimeout;

  const debounce = (e) => {
    console.log("====================================");
    console.log(e.target.value);
    console.log("====================================");
    const searchWord = e.target.value;
    let searchArr = data?.[0].concat(data?.[1]);
    console.log(searchArr, "Ev");
    const newFilter = searchArr.filter((value) => {
      return (value?.basic_details?.username || value?.supplierName)
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setSearchList([]);
      return;
    }
    console.log(newFilter, "NEWFILTER");
    setSearchList(newFilter);
  };

  const searchHandler = (e) => {
    flag = false;
    clearTimeout(deTimeout);

    deTimeout = setTimeout(() => {
      flag = true;
      if (flag) {
        debounce(e);
      }
    }, 500);
  };

  return (
    <>
      {data ? (
        <div className="relative ">
          <div className="w-auto mx-2 relative">
            <input
              ref={clearInput}
              onChange={searchHandler}
              placeholder="search by name..."
              className="rounded-xl p-4  w-full border-secondary border-2"
              type="text"
            />
            {searchList.length > 0 && (
              <button
                onClick={() => {
                  clearInput.current.value = "";
                  setSearchList([]);
                }}
                className="absolute right-[5%] text-xl top-[50%] translate-y-[-50%] text-xl"
              >
                x
              </button>
            )}
          </div>

          <div className="scrollList search__list flex w-full flex-col  px-2 ">
            <div className="flex flex-wrap">
              {console.log(data?.length, "EDATA")}
              {(searchList.length > 0
                ? searchList
                : data?.[0].concat(data?.[1])
              ).map((data, key) => {
                console.log(data, "EDATA");

                return (
                  <Link
                    className="m-2 lg:w-1/3 md:w-1/2 w-full"
                    key={key}
                    href={
                      data.supplierName
                        ? `/suppliers/${data._id} `
                        : `/customers/${data._id}`
                    }
                  >
                    <div className="">
                      <div className="h-full flex items-center border-gray-200 bg-secondary border px-4 py-2 rounded-lg">
                        <div
                          className={`w-12 h-12 text-3xl text-[#fff] bg-primary flex justify-center items-center rounded-full mr-4 `}
                        >
                          {data?.basic_details?.username[0] ||
                            data?.supplierName[0]}
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-gray-900 title-font font-medium">
                            {data?.basic_details?.username ||
                              data?.supplierName}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* <button onClick={() => document.getElementById('sort_modal').showModal()} className='bg-primary p-2 rounded-xl'>Search</button> */
        /* Open the modal using document.getElementById('ID').showModal() method */

        <LoadingSpinner />
      )}
    </>
  );
};

export default page;
