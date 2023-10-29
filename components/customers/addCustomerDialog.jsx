import React,{useState} from 'react'

const AddCustomerDialog = () => {
    const [customerPayload, setCustomerPayload] = useState({name:'',phone:''});

    const submitHandler = async () => {
        if (customerPayload.name === '') {
            setCustomerPayload({...customerPayload,name:false})
            return

        } else if (customerPayload.phone === '') {
            setCustomerPayload({ ...customerPayload, phone: false })
            return
        }

        const response = await fetch("/api/customers", {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                "basic_details": {
                    "username": customerPayload.name,
                    "phone_no": customerPayload.phone
                }
            }),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json"
            }
        }

        )

        const resp = await response.json();
        // console.log(resp)
        if (resp.status === 200) {
            authContext.loginHandler(true, resp.message.token)



        } else {
            setError(resp.message)
        }





    }


  return (
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Enter Customer Name and Contact No. below:</p>
              <div className="modal-action flex-wrap justify-center w-full gap-10">
                  <form method="dialog" className='flex flex-col w-full'>
                      {/* if there is a button in form, it will close the modal */}
                      <div className=" w-full text-left">
                          <label className="control-label font-[600] " htmlFor="Email">Customer Name</label>

                          <div className="">
                              <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" data-val-required="The UserName field is required." id="UserName" name="UserName" type="text" onChange={(e) => { setCustomerPayload({...customerPayload,name:e.target.value}) }} />
                              {customerPayload.name === false && <span className="text-[red]" data-valmsg-for="UserName" data-valmsg-replace="true">Customer Name is required</span>}

                          </div>
                      </div>

                      <div className=" w-full text-left">
                          <label className="control-label font-[600] " for="Password">Contact No.</label>
                          <div className="">
                              <input className="border-2 w-full sm:text-md mt-2 px-4 py-2" data-val="true" data-val-required="The Password field is required." id="Password" name="Password" type="number" onChange={(e) => { setCustomerPayload({...customerPayload,  phone:e.target.value}) }} />
                              {customerPayload.phone === false && <span className="text-[red]" data-valmsg-for="UserName" data-valmsg-replace="true">Contact No is required</span>}


                          </div>
                      </div>


                  </form>
                  <button className="btn w-[40%]" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
                  <button className="btn w-[40%]" onClick={submitHandler}>Submit</button>

              </div>
          </div>
      </dialog>
  )
}

export default AddCustomerDialog