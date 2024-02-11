import React, { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@helper/http";
import { addStaff } from "@helper/http";
import { toastAlert } from "@components/ui/toastAlert";
import FormBtns from "@components/ui/formBtns";
const AddStaffDialog = () => {
  const [staffPayload, setStaffPayload] = useState({
    name: "",
    phone: "",
    salary: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: addStaff,
    onSuccess: () => {
      toastAlert("Staff member added successfully!");
      document.querySelector("#add_staff_modal form").reset();
      document.getElementById("add_staff_modal").close();
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      setStaffPayload({ ...staffPayload, name: "", phone: "", salary: "" });
    },
  });

  const submitHandler = async () => {
   
    mutate({ staffPayload: staffPayload });
  };

  return (
    <dialog id="add_staff_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">
          Enter Staff Member's Name and Contact No. and salary below:
        </p>
        <div className="modal-action flex-wrap justify-center w-full gap-10">
          <form onSubmit={(e)=>{e.preventDefault;submitHandler()}} className="flex flex-col w-full">
            {/* if there is a button in form, it will close the modal */}
            <div className=" w-full text-left">
              <label className="control-label font-[600] ">
                Staff member Name
              </label>

              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  data-val="true"
                  data-val-required="The UserName field is required."
                  id="UserName"
                  name="UserName"
                  type="text"
                  onChange={(e) => {
                    setStaffPayload({ ...staffPayload, name: e.target.value });
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
                    setStaffPayload({ ...staffPayload, phone: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div className=" w-full text-left">
              <label className="control-label font-[600] ">Salary</label>
              <div className="">
                <input
                  className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                  id="Password"
                  name="Password"
                  type="number"
                  onChange={(e) => {
                    setStaffPayload({
                      ...staffPayload,
                      salary: e.target.value,
                    });
                  }}
                  required
                />
              </div>
            </div>
            <FormBtns status={status} modal="add_staff_modal" />
          </form>
        
        </div>
      </div>
    </dialog>
  );
};

export default AddStaffDialog;
