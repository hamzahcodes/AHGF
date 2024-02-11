import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@helper/http";
import { addStock } from "@helper/http";
import { toastAlert } from "@components/ui/toastAlert";
import FormBtns from "@components/ui/formBtns";
const AddStockDetailsDialog = ({ id }) => {
  const [stockPayload, setStockPayload] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: addStock,
    onSuccess: () => {
      document.getElementById("addStockModal").close();
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
      toastAlert("Details were updated successfully!!");
    },
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    mutate({ stockPayload: stockPayload, id: id });
  };

  return (
    <dialog id="addStockModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Enter Stock Details below:</p>
        <div className="modal-action flex-wrap justify-center w-full gap-10">
          <form onSubmit={submitHandler} className="flex flex-col w-full">
            {/* if there is a button in form, it will close the modal */}
            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Stock type</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  data-val-required="The UserName field is required."
                  id="UserName"
                  name="UserName"
                  type="text"
                  onChange={(e) => {
                    setStockPayload({
                      ...stockPayload,
                      name: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Quantity</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  id="UserName"
                  name="UserName"
                  type="text"
                  onChange={(e) => {
                    setStockPayload({
                      ...stockPayload,
                      quantity: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Price</label>
              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  id="Amount"
                  name="Amount"
                  type="number"
                  onChange={(e) => {
                    setStockPayload({
                      ...stockPayload,
                      price: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <FormBtns status={status} modal="addStockModal" />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddStockDetailsDialog;
