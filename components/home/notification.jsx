"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";



const Notification = () => {
  const router = useRouter();

  
  const deliveryNotePage = (e) => {
    e.preventDefault();
    router.push('/deliverynote')
    // router.refresh()
  }

  const invoicePage = (e) => {
    e.preventDefault();
    router.push('/invoice')
    // router.refresh()
  }

  const onboardingPage = (e) => {
    e.preventDefault()
    router.push('/onboardingform')
    // router.refresh()
  }

  

  return (
    <div className="w-[100] p-5 flex justify-center items-center flex-col mt-7 gap-y-12 ">
      <div className="w-[100%] flex flex-wrap items-center justify-around">
        <div className="w-[90%] md:w-1/4 my-3">
        <button onClick={invoicePage} className="w-full py-3 bg-primary rounded-md text-[#fff]">
          Print Invoice
        </button>
        </div>
        <div className="w-[90%] md:w-1/4 my-3">
        <button onClick={onboardingPage} className="w-full py-3 bg-primary rounded-md text-[#fff]">
          Onboarding Form
        </button>
        </div>
        <div className="w-[90%] md:w-1/4 my-3">
        <button onClick={deliveryNotePage} className="w-full py-3 bg-primary rounded-md text-[#fff]">
          Print Delivery Note
        </button>
        </div>
      </div>

      <div
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Notification Sent!");
          setMessage("");
        }}
      >
        <h2 className="text-xl font-bold">Send Notification</h2>
        {/* <form action="">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="border-2 border-primary rounded-lg w-full p-4"
            name="message"
            placeholder="Type your message..."
            id=""
            cols="30"
            rows="4"
            required
          ></textarea> */}



          
        {/* </form> */}
      </div>
    </div>
  );
};

export default Notification;