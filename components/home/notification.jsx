"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Notification = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const deliveryNotePage = (e) => {
    e.preventDefault();
    router.push('/deliverynote')
    router.refresh()
  }

  const invoicePage = (e) => {
    e.preventDefault();
    router.push('/invoice')
    router.refresh()
  }

  const onboardingPage = (e) => {
    e.preventDefault()
    router.push('/onboardingform')
    router.refresh()
  }

  const handleWhatsapp = () => {
    if (!message) {
      alert("Pls put a notification in text area");
      return;
    }
    const payment = 2000
    const companyName = 'Al - Hadi Goat Farm(8850284856)'

    window.open(`https://wa.me/+918268201182?text=Hello%20there,%20here's%20a%20small%20reminder.%0AYour%20payment%20of%20₹%20${payment}%20is%20pending%20at%20${companyName}%0AYou%20can%20view%20the%20payment%20details%20at:%20https://example.com/path/to/your/pdf.pdf%0A%0AIf%20the%20link%20is%20not%20clickable,%20please%20save%20this%20contact%20and%20try%20again.`);

  };

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
        <form action="">
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
          ></textarea>

          <button
            onClick={handleWhatsapp}
            disabled={message.length == 0 && true}
            type="submit"
            className="w-full bg-secondary rounded-lg shadow-xl border-0 p-2 text-[#fff] text-xl my-4"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Notification;