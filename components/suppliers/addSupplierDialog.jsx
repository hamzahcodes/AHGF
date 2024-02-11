"use client";

import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@helper/http";
import { addSupplier } from "@helper/http";
import { toastAlert } from "@components/ui/toastAlert";
import FormBtns from "@components/ui/formBtns";
const AddSupplierDialog = () => {
  const [supplierPayload, setSupplierPayload] = useState({
    name: "",
    phone: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: addSupplier,
    onSuccess: () => {
      toastAlert("Supplier added successfully!!");
       setSupplierPayload({ name: "", phone: "" });
      document.getElementById("add_supplier_modal").close();
     
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
    },
  });

  const submitHandler = async () => {
    mutate({ supplierPayload: supplierPayload });
  };

  return (
    <dialog
      id="add_supplier_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Enter Supplier Name and Contact No. below:</p>
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
              <label className="control-label font-[600] ">Supplier Name</label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  data-val-required="The UserName field is required."
                  id="UserName"
                  name="UserName"
                  type="text"
                  onChange={(e) => {
                    setSupplierPayload({
                      ...supplierPayload,
                      name: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Contact No.</label>
              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  id="Password"
                  name="Password"
                  type="number"
                  onChange={(e) => {
                    setSupplierPayload({
                      ...supplierPayload,
                      phone: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <FormBtns status={status} modal="add_supplier_modal" />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddSupplierDialog;
