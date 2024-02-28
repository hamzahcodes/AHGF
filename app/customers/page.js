"use client";
import React, { useEffect, useState, useRef } from "react";
import Layout from "@components/ParentDrawer/Layout";
import CustomerList from "@components/customers/customerList";
// import AuthContext from '@store/auth-context'
import Link from "next/link";
import AddCustomerDialog from "@components/customers/addCustomerDialog";
import Stats from "@components/customers/stats";
import LoadingSpinner from "@components/ui/loadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "@helper/http";
import AddItem from "@components/DeliveryNote/AddItem";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ToastAlert from "@components/ui/toastAlert";

const Page = () => {
  const { data: session } = useSession();
  if (!session?.user?.id) redirect("/login");

  const [searchList, setSearchList] = useState([]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getAllCustomers(),
  });

  if (isError) {
    console.log("error in fetching all customers");
  }
  let flag = true,
    deTimeout;

  const debounce = (e) => {
    console.log("====================================");
    console.log(e.target.value);
    console.log("====================================");
    const searchWord = e.target.value;
    const newFilter = data.filter((value) => {
      return value.basic_details.username
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setSearchList([]);
      return;
    }
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
        <div className="relative">
          <div className=" w-auto mx-2 my-2">
            <Stats customerData={data} />
          </div>

          <CustomerList customerData={data} />
        </div>
      ) : (
        <LoadingSpinner />
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
        className="text-5xl fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-accent text-[#fff]"
      >
        +
      </button>

      <AddCustomerDialog />
    </>
  );
};

export default Page;
