import React, { useState, useEffect } from "react";
import Toast, { toastAlert } from "@components/ui/toastAlert";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@helper/http";
import { editCustomer } from "@helper/http";
import FormBtns from "@components/ui/formBtns";

const AddGoatDetailsDialog = ({ id, setIsEdit, isEdit }) => {
  console.log(isEdit.data, "tiger");
  const [customerPayload, setCustomerPayload] = useState({
    quantity: "",
    breed: "",
    height: "",
    weight: "",
    on_boarding: "",
    gender: "",

    goat_type: "",
    palaai_type: "",
    amount: "",
    off_boarding: new Date(),
  });

  useEffect(() => {
    setCustomerPayload({
      ...customerPayload,
      quantity: isEdit.data.quantity ? isEdit.data.quantity : "",
      breed: isEdit.data.breed ? isEdit.data.breed : "",
      height: isEdit.data.height ? isEdit.data.height : "",
      weight: isEdit.data.weight ? isEdit.data.weight : "",
      on_boarding: isEdit.data.on_boarding ? isEdit.data.on_boarding : "",
      gender: isEdit.data.gender ? isEdit.data.gender : "",

      goat_type: isEdit.data.goat_type ? isEdit.data.goat_type : "",
      palaai_type: isEdit.data.palaai_type ? isEdit.data.palaai_type : "",
      amount: isEdit.data.total_amount ? isEdit.data.total_amount : "",
      off_boarding: isEdit.data.quantity ? isEdit.data.quantity : new Date(),
    });
  }, [isEdit?.status]);

  const { mutate, status } = useMutation({
    mutationFn: editCustomer,
    onSuccess: () => {
      document.querySelector("#my_modal_10 form").reset();
      document.getElementById("my_modal_10").close();
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      toastAlert("Details were updated successfully!");
    },
  });

  const submitHandler = async () => {
    mutate({ customerPayload: customerPayload, id: id ,goatId: isEdit.data._id});
  };

  return (
    <dialog id="my_modal_10" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Enter Goat Details below:</p>
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
              <label className="control-label font-[600] ">Goat type </label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.goat_type}
                  id="goat_type"
                  name="goat_type"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      goat_type: e.target.value,
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
                  value={customerPayload.quantity}
                  id="quantity"
                  name="quantity"
                  type="number"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      quantity: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Breed</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.breed}
                  id="breed"
                  name="breed"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      breed: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Gender</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.gender}
                  id="gender"
                  name="gender"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      gender: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Weight</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.weight}
                  id="weight"
                  name="weight"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      weight: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Height</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.height}
                  id="UserName"
                  name="UserName"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      height: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Palaai type</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.palaai_type}
                  id="UserName"
                  name="UserName"
                  type="text"
                  onChange={(e) => {
                    setCustomerPayload({
                      ...customerPayload,
                      palaai_type: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Total Amount</label>
              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  value={customerPayload.amount}
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

            <FormBtns
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              status={status}
              modal="my_modal_10"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddGoatDetailsDialog;
