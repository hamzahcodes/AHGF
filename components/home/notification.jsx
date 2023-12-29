"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "@helper/http";
import { useRouter } from "next/navigation";

const Notification = () => {
  const [recipentList, setRecipentList] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getAllCustomers(),
  });

  const deliveryNotePage = (e) => {
    e.preventDefault();
    router.push('/deliverynote')
    router.refresh()
  }

  const handleWhatsapp = () => {
    if (!message) {
      alert("Pls put a notification in text area");
      return;
    }
    const phoneNumbersOfRecipient = [];

    recipentList.forEach((recipient) => {
      data.forEach((ele) => {
        if (ele.basic_details.username === recipient) {
          phoneNumbersOfRecipient.push(ele.basic_details.phone_no);
        }
      });
    });

    phoneNumbersOfRecipient.forEach((phone) => {
      window.open(`https://wa.me/91${phone}?text=${message}`);
    });
  };

  return (
    <div className=" flex justify-center items-center flex-col gap-12 w-[90%] mx-auto mt-14 ">
      <div className="w-full flex justify-between items-center">
        <button className="bg-primary rounded-md text-[#fff] p-4">
          Print Quotation
        </button>
        <button onClick={deliveryNotePage} className="bg-primary rounded-md text-[#fff] p-4">
          Print Delivery Note
        </button>
      </div>

      <div
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Notification Sent!");
          setRecipentList([]);
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
            onClick={() =>
              document.getElementById("recipent_modal").showModal()
            }
            className="text-secondary"
            type="button"
          >
            + Add recipients
          </button>
          <div>
            {recipentList.length > 0 &&
              recipentList.map((data, key) => (
                <span className="mx-2 underline" key={key}>
                  {data}
                </span>
              ))}
          </div>

          <button
            onClick={handleWhatsapp}
            disabled={recipentList.length == 0 && true}
            type="submit"
            className="w-full bg-secondary rounded-lg shadow-xl border-0 p-2 text-[#fff] text-xl my-4"
          >
            Send
          </button>
        </form>
      </div>

      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="recipent_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Select customers</h3>
            <div className="flex flex-col overflow-y-scroll max-h-[300px] mt-4">
              {data?.map((customer, key) => (
                <div
                  key={customer._id}
                  className="text-xl flex w-full justify-start gap-8 my-4"
                >
                  <input
                    name={customer.basic_details.username}
                    onChange={(e) => {
                      e.target.checked
                        ? setRecipentList((prev) => [
                            ...prev,
                            customer.basic_details.username,
                          ])
                        : setRecipentList((prev) => [
                            ...prev.splice(
                              prev.indexOf(customer.basic_details.username),
                              1
                            ),
                          ]);
                    }}
                    type="checkbox"
                    value={customer}
                  />
                  <label>
                    {customer.basic_details.username}
                  </label>
                </div>
              ))}
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("recipent_modal").close()
                }
              >
                Back
              </button>
              <button
                className="btn bg-primary text-[#fff]"
                onClick={() =>
                  document.getElementById("recipent_modal").close()
                }
              >
                Done
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Notification;