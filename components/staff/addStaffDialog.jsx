


import React, { useState } from 'react'

import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@helper/http';
import { addStaff } from '@helper/http';
const AddStaffDialog = () => {
  
    const [staffPayload, setStaffPayload] = useState({ name: '', phone: '',salary:'' });


    const { mutate } = useMutation({
        mutationFn: addStaff,
        onSuccess: () => {
            alert('Staff member added successfully!!')
            document.getElementById('add_staff_modal').close()
            queryClient.invalidateQueries({ queryKey: ['staff'] });
            setStaffPayload({ ...staffPayload, name: '',phone:'',salary:'' })
        }
    })







    const submitHandler = async () => {
        if (staffPayload.name === '' || staffPayload.name === false) {
            setStaffPayload({ ...staffPayload, name: false })
            return

        } else if (staffPayload.phone === '' || staffPayload.phone === '') {
            setStaffPayload({ ...staffPayload, phone: false })
            return
        } else if (staffPayload.salary === '' || staffPayload.salary === '') {
            setStaffPayload({ ...staffPayload, salary: false })
            return
        }

        mutate({ staffPayload: staffPayload });



    }


    return (
        <dialog id="add_staff_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Enter Staff Member's Name and Contact No. and salary below:</p>
                <div className="modal-action flex-wrap justify-center w-full gap-10">
                    <form method="dialog" className='flex flex-col w-full'>
                        {/* if there is a button in form, it will close the modal */}
                        <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Staff member Name</label>

                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" type="text" onChange={(e) => { setStaffPayload({ ...staffPayload, name: e.target.value }) }} />
                                {staffPayload.name === false && <span className="text-[red]" data-valmsg-for="UserName" data-valmsg-replace="true">Name is required</span>}

                            </div>
                        </div>

                        <div className=" w-full text-left">
                            <label className="control-label font-[600] ">Contact No.</label>
                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" id="Password" name="Password" type="number" onChange={(e) => { setStaffPayload({ ...staffPayload, phone: e.target.value }) }} />
                                {staffPayload.phone === false && <span className="text-[red]"  >Contact No is required</span>}


                            </div>
                        </div>

                        <div className=" w-full text-left">
                            <label className="control-label font-[600] ">Salary</label>
                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" id="Password" name="Password" type="number" onChange={(e) => { setStaffPayload({ ...staffPayload, salary: e.target.value }) }} />
                                {staffPayload.salary === false && <span className="text-[red]"  >Salary Amount is required</span>}


                            </div>
                        </div>


                    </form>
                    <button className="btn w-[40%]" onClick={() => {
                        setStaffPayload({ ...staffPayload, name: '' }); document.getElementById('add_staff_modal').close();
                     }}>Close</button>
                    <button className="btn w-[40%]" onClick={submitHandler}>Submit</button>

                </div>
            </div>
        </dialog>
    )
}

export default AddStaffDialog