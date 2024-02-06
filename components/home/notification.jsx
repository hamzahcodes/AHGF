"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImageToCloudinary } from "@utils/cloudinary";

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

  const handleWhatsapp = async () => {
    if (!message) {
      alert("Pls put a notification in text area");
      return;
    }
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December" ];
    const payment = 2000
    const companyName = 'Al - Hadi Goat Farm(8850284856)'
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Set background color
    ctx.fillStyle = '#DCF2F1'; // Example background color

    // Draw a filled rectangle covering the entire canvas area
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw something on the canvas (e.g., text)
    const yTop = 200
    ctx.fillStyle = '#365486';
    ctx.font = "bold 100px 'Comic Sans MS', cursive";
    ctx.fillText('Payment Reminder for', 400, 100+yTop);

    ctx.fillStyle = 'red';
    ctx.font = "bold 100px 'Comic Sans MS', cursive";
    ctx.fillText('₹2000', 750, 250+yTop);
    // on 13 Jan 2024

    ctx.fillStyle = '#7FC7D9';
    ctx.font = "50px 'Comic Sans MS', cursive";
    ctx.fillText(`on ${new Date().getDate()} ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`, 700, 350+yTop);

    ctx.fillStyle = '#365486';
    ctx.font = "bold 100px 'Comic Sans MS', cursive";
    ctx.fillText('Sent by Al - Hadi Goat Farm', 250, 550+yTop);

    ctx.fillStyle = '#7FC7D9';
    ctx.font = "50px 'Comic Sans MS', cursive";
    ctx.fillText('SAJID MULLA | (8850284856)', 550, 650+yTop);

    // Get the data URL of the image
    const imageDataUrl = canvas.toDataURL('image/png');
    console.log(imageDataUrl);
    // const imageURL = await uploadImageToCloudinary(imageDataUrl);

    // const whatsappMessage = `Hello%20there,%20here's%20a%20small%20reminder.%0AYour%20payment%20of%20₹%20${payment}%20is%20pending%20at%20${companyName}%0AYou%20can%20view%20the%20payment%20details%20at:%20${imageURL}%0A%0AIf%20the%20link%20is%20not%20clickable,%20please%20save%20this%20contact%20and%20try%20again.`;
    // const phone = '+918268201182'
    // const msg = encodeURIComponent('Hello, welcome to freecodecamp.org')
    // window.open(`https://wa.me/${phone}/?text=${msg}`)
    // Encode the message for use in a URL
    // const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/+918268201182?text=${whatsappMessage}`);

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