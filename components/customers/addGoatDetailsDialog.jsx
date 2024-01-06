import React, { useState, useContext } from 'react'
import AuthContext from '@store/auth-context';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@helper/http';
import { editCustomer } from '@helper/http';
const AddGoatDetailsDialog = ({id}) => {
    
    const context = useContext(AuthContext);
    const [customerPayload, setCustomerPayload] = useState({ goat_type: '', palaai_type: '', amount: '', off_boarding: new Date().toLocaleDateString("en-IN") });


    const { mutate } = useMutation({
        mutationFn: editCustomer,
        onSuccess: () => {
            document.getElementById('my_modal_10').close()
            queryClient.invalidateQueries({ queryKey: ['customer'] }) ;
            alert('Details were updated successfully!!')

            }
    })







    const submitHandler = async () => {
        if (customerPayload.goat_type === '' || customerPayload.goat_type === false) {
            setCustomerPayload({ ...customerPayload, goat_type: false })
            return

        } else if (customerPayload.palaai_type === ''  || customerPayload.palaai_type === false) {
            setCustomerPayload({ ...customerPayload, palaai_type: false })
            return
        } else if (customerPayload.amount === '' || customerPayload.amount === false) {
            setCustomerPayload({ ...customerPayload, amount: false })
            return
        }

        mutate({ customerPayload: customerPayload, id:id });



    }


    return (
        <dialog id="my_modal_10" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Enter Goat Details below:</p>
                <div className="modal-action flex-wrap justify-center w-full gap-10">
                    <form method="dialog" className='flex flex-col w-full'>
                        {/* if there is a button in form, it will close the modal */}
                        <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Goat type</label>

                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" type="text" onChange={(e) => { setCustomerPayload({ ...customerPayload, goat_type: e.target.value }) }} />
                                {customerPayload.goat_type === false && <span className="text-[red]" data-valmsg-for="UserName" data-valmsg-replace="true">Goat Type is required</span>}

                            </div>
                        </div>

                        <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Palaai type</label>

                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" id="UserName" name="UserName" type="text" onChange={(e) => { setCustomerPayload({ ...customerPayload, palaai_type: e.target.value }) }} />
                                {customerPayload.palaai_type === false && <span className="text-[red]" data-valmsg-for="UserName" data-valmsg-replace="true">Palaai Type is required</span>}

                            </div>
                        </div>

                        <div className=" w-full text-left">
                            <label className="control-label font-[600] " >Total Amount</label>
                            <div className="">
                                <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" id="Amount" name="Amount" type="number" onChange={(e) => { setCustomerPayload({ ...customerPayload, amount: e.target.value }) }} />
                                {customerPayload.amount === false && <span className="text-[red]" data-valmsg-for="UserName" >Amount is Required</span>}


                            </div>
                        </div>


                    </form>
                    <button className="btn w-[40%]" onClick={() => document.getElementById('my_modal_10').close()}>Close</button>
                    <button className="btn w-[40%]" onClick={submitHandler}>Submit</button>

                </div>
            </div>
        </dialog>
    )
}

export default AddGoatDetailsDialog
