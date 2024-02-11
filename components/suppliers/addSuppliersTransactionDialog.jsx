import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { editSupplier, queryClient } from "@helper/http";
import { toastAlert } from "@components/ui/toastAlert";

const AddSuppliersTransactionDialog = ({ id }) => {
  const [supplierPayload, setSupplierPayload] = useState({ payment: "" });

  const { mutate } = useMutation({
    mutationFn: editSupplier,
    onSuccess: () => {
      document.getElementById("add_supplier_transaction").close();
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
          <form method="dialog" className="flex flex-col w-full">
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
                {supplierPayload.payout_date === false && (
                  <span
                    className="text-[red]"
                    data-valmsg-for="UserName"
                    data-valmsg-replace="true"
                  >
                    Payment amount is required
                  </span>
                )}
              </div>
            </div>

            {/* <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Balance</label>
                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" id="Amount" name="Amount" type="number" onChange={(e) => { setSupplierPayload({ ...supplierPayload, balance: e.target.value }) }} />
                                {supplierPayload.amount === false && <span className="text-[red]" data-valmsg-for="UserName" >balance amount is Required</span>}


                            </div>
                        </div> */}
          </form>
          <button
            className="btn w-[40%]"
            onClick={() =>
              document.getElementById("add_supplier_transaction").close()
            }
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

export default AddSuppliersTransactionDialog;
