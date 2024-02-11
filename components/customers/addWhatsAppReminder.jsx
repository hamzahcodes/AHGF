import React, { useState } from 'react'
import { setReminderAmount } from "@helper/http";
import { useMutation } from "@tanstack/react-query";
import { useSession } from 'next-auth/react';

const addWhatsAppReminder = ({ custId }) => {

    const { data: session } = useSession()


    const [reminder, setReminder] = useState("");
    const { mutate } = useMutation({
        mutationFn: setReminderAmount,
        onSuccess: () => {
            document.getElementById("send_whatsapp").close();
            //   queryClient.invalidateQueries({ queryKey: ["customer"] });
            alert("Notification Sent")
        },
    });
    
    const submitHandler = async () => {
        if (!reminder) {
            alert("Pls put a notification in text area");
            return;
        }
        console.log(custId);
        mutate({ reminderAmount: reminder, id: custId });

        const paymentLink = `http://192.168.0.104:3000/reminder/?custID=${custId}%26userID=${session?.user?.id}`
        const whatsappMessage = `Hello there, here's a small reminder. Your payment of ${reminder} is pending at Al-Hadi Goat Farm. You can view the payment details here. %0A%0A${paymentLink}`
        window.open(`https://wa.me/+918268201182?text=${whatsappMessage}`);
      };   

  return (
    <dialog
    id="send_whatsapp"
    className="modal modal-bottom sm:modal-middle"
  >
    <div className="modal-box">
      <h3 className="font-bold text-lg">WhatsApp Reminder!</h3>
      {/* <p className="py-4">Enter Reminder Amount:</p> */}
      <div className="modal-action flex-wrap justify-center w-full gap-10">
        <form method="dialog" className="flex flex-col w-full">
          {/* if there is a button in form, it will close the modal */}
          <div className=" w-full text-left">
            <label className="control-label font-[600] ">Reminder Amount</label>

            <div className="">
              <input
                type="number"
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                onChange={(e) => {
                  setReminder(e.target.value);
                  console.log(e.target.value);
                }}
              />
              {reminder === false && (
                <span
                  className="text-[red]"
                  data-valmsg-for="UserName"
                  data-valmsg-replace="true"
                >
                  Reminder amount is required
                </span>
              )}
            </div>
          </div>
        </form>
        <button
          className="btn w-[40%]"
          onClick={() =>
            document.getElementById("send_whatsapp").close()
          }
        >
          Close
        </button>
        <button className="btn w-[40%]" onClick={submitHandler}
        >
          Send
        </button>
      </div>
    </div>
  </dialog>
  )
}

export default addWhatsAppReminder