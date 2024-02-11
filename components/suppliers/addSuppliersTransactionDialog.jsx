import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { editSupplier, queryClient } from "@helper/http";
import { toastAlert } from "@components/ui/toastAlert";
import FormBtns from "@components/ui/formBtns";

const AddSuppliersTransactionDialog = ({ id }) => {
  const [supplierPayload, setSupplierPayload] = useState({ payment: "" });

  const { mutate, status } = useMutation({
    mutationFn: editSupplier,
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
      toastAlert("Details were updated successfully!!");
    },
  });

  const submitHandler = async () => {
    if (supplierPayload.payment === "" || supplierPayload.payment === false) {
      setSupplierPayload({ ...supplierPayload, payment: false });
      return;
    }
    // } else if (supplierPayload.balance === '' || supplierPayload.balance === false) {
    //     setSupplierPayload({ ...supplierPayload, balance: false })
    //     return
    // }

    mutate({ supplierPayload: supplierPayload, id: id });
  };

  return (
    <dialog
      id="add_supplier_transaction"
      className="modal modal-bottom sm:modal-middle"
    >
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
              <label className="control-label font-[600] ">Payment</label>

              <div className="">
                <input
                  type="number"
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  onChange={(e) => {
                    setSupplierPayload({
                      ...supplierPayload,
                      payment: e.target.value,
                    });
                    console.log(e.target.value);
                  }}
                />
              </div>
            </div>

            <FormBtns status={status} modal="add_supplier_transaction"/>
          </form>
         
        </div>
      </div>
    </dialog>
  );
};

export default AddSuppliersTransactionDialog;
