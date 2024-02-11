import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@helper/http";
import { editCustomer } from "@helper/http";
import { toastAlert } from "@components/ui/toastAlert";

const AddPaymentDetailsDialog = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setSelectedFile(file);
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      console.log('called: ', reader)
      setSelectedFile(reader.result)
    }
  };
  const [customerPayload, setCustomerPayload] = useState({
    payout_date: "",
    amount: "",
    remarks:"",
  });

  const { mutate } = useMutation({
    mutationFn: editCustomer,
    onSuccess: () => {
      document.getElementById("my_modal_15").close();
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      toastAlert("Details were updated successfully!!");
    },
  });

  const submitHandler = async () => {
    console.log("In submit handler add payment dialog #29");
    if (
      customerPayload.payout_date === "" ||
      customerPayload.payout_date === false
    ) {
      setCustomerPayload({ ...customerPayload, payout_date: false });
      return;
    } else if (
      customerPayload.amount === "" ||
      customerPayload.amount === false
    ) {
      setCustomerPayload({ ...customerPayload, amount: false });
      return;
    }

    console.log(selectedFile, " at line #51");
    // handleUpload()

    mutate({
      customerPayload: customerPayload,
      id: id,
      isPayment: true,
      imageFile: selectedFile,
    });
  };

  const handleUpload = async () => {
    event.preventDefault();
    if (!selectedFile) return;

    try {
      const data = new FormData();
      data.set("file", selectedFile);

      const res = await fetch("/api/uploadFile", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  return (
    <dialog id="my_modal_15" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Enter transaction details below:</p>
        <div className="modal-action flex-wrap justify-center w-full gap-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
            className="flex flex-col w-full"
          >
            {/* if there is a button in form, it will close the modal */}
            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Payout Date</label>

              <div className="">
                <input
                  type="date"
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      payout_date: e.target.value,
                    });
                    console.log(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Payout Amount</label>
              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  id="Amount"
                  name="Amount"
                  type="number"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      amount: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Remarks</label>
              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  id="Remarks"
                  name="Remarks"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      remarks: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <input type="file" onChange={handleFileChange} />
              {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            </div>

            <div className="w-full flex justify-between my-4">
              <button
                className="btn w-[40%]"
                type="button"
                onClick={() => document.getElementById("my_modal_15").close()}
              >
                Close
              </button>
              <button className="btn w-[40%]" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddPaymentDetailsDialog;
