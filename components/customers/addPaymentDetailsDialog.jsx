import React, { useState, useContext } from "react";
import AuthContext from "@store/auth-context";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@helper/http";
import { editCustomer } from "@helper/http";

const AddPaymentDetailsDialog = ({ id }) => {
  const context = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
    };
  const [customerPayload, setCustomerPayload] = useState({
    payout_date: "",
    amount: "",
  });

  const { mutate } = useMutation({
    mutationFn: editCustomer,
    onSuccess: () => {
      document.getElementById("my_modal_15").close();
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      alert("Details were updated successfully!!");
    },
  });

  const submitHandler = async () => {
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

    // handleUpload()

    mutate({ customerPayload: customerPayload, id: id, isPayment: true ,imageFile:selectedFile});

  };


   const handleUpload =async () => {
    event.preventDefault()
    if (!selectedFile) return

    try {
      const data = new FormData()
      data.set('file', selectedFile)

      const res = await fetch('/api/uploadFile', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (error) {
      // Handle errors here
      console.error(error)
    }
  }

  return (
    <dialog id="my_modal_15" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Enter transaction details below:</p>
        <div className="modal-action flex-wrap justify-center w-full gap-10">
          <form method="dialog" className="flex flex-col w-full">
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
                />
                {customerPayload.payout_date === false && (
                  <span
                    className="text-[red]"
                    data-valmsg-for="UserName"
                    data-valmsg-replace="true"
                  >
                    Payout date is required
                  </span>
                )}
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
                />
                {customerPayload.amount === false && (
                  <span className="text-[red]" data-valmsg-for="UserName">
                    Amount is Required
                  </span>
                )}
              </div>
            </div>

            <div>
              <input type="file" onChange={handleFileChange} />
              {selectedFile && <p>Selected File: {selectedFile.name}</p>}
            </div>
          </form>
          <button
            className="btn w-[40%]"
            onClick={() => document.getElementById("my_modal_15").close()}
          >
            Close
          </button>
          <button className="btn w-[40%]" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddPaymentDetailsDialog;
