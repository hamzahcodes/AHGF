import React, { useState, useContext } from 'react'
import AuthContext from '@store/auth-context';
import { useMutation } from '@tanstack/react-query';
import { editStaff, editSupplier, queryClient } from '@helper/http';



const EditStaffDialog = ({ id }) => {

    const context = useContext(AuthContext);
    const [staffPayload, setStaffPayload] = useState({ phone: '', salary: '' });


    const { mutate } = useMutation({
        mutationFn: editStaff,
        onSuccess: () => {
            document.getElementById('edit_staff_dialog').close()
            queryClient.invalidateQueries({ queryKey: ['staff'] });
            alert('Details were updated successfully!!')

        }
    })







    const submitHandler = async () => {

        if (staffPayload.phone === '' || staffPayload.phone === false) {
            setStaffPayload({ ...staffPayload, phone: false })
            return

        } else if (staffPayload.salary === '' || staffPayload.salary === false) {
            setStaffPayload({ ...staffPayload, salary: false })
            return
        }

        mutate({ staffPayload: staffPayload, token: context.isLoggedIn.token, id: id });



    }


    return (
        <dialog id="edit_staff_dialog" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Edit staff Details:</p>
                <div className="modal-action flex-wrap justify-center w-full gap-10">
                    <form method="dialog" className='flex flex-col w-full'>
                        {/* if there is a button in form, it will close the modal */}
                        <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Phone</label>

                            <div className="">
                                <input type='number' className="border-2 w-full sm:text-md mt-2 px-4 py-2" onChange={(e) => { setStaffPayload({ ...staffPayload, phone: e.target.value }); console.log(e.target.value) }} />
                                {staffPayload.phone === false && <span className="text-[red]" data-valmsg-for="UserName" data-valmsg-replace="true">Phone No. is required</span>}

                            </div>
                        </div>



                        <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Salary</label>
                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" id="Amount" name="Amount" type="number" onChange={(e) => { setStaffPayload({ ...staffPayload, salary: e.target.value }) }} />
                                {staffPayload.salary === false && <span className="text-[red]" data-valmsg-for="UserName" >salary amount is Required</span>}


                            </div>
                        </div>


                    </form>
                    <button className="btn w-[40%]" onClick={() => document.getElementById('edit_staff_dialog').close()}>Close</button>
                    <button className="btn w-[40%]" onClick={submitHandler}>Submit</button>

                </div>
            </div>
        </dialog>
    )
}

export default EditStaffDialog
