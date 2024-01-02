import React from 'react'

const AddBoardingItem = ({ handleModal, boardingPayload, handleBoardingPayloadChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleBoardingPayloadChange((boardingPayload) => ({ ...boardingPayload, [name]: value }));
  }

  return (
    <dialog id="addItemBoardingModal" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Item Details</h3>
      <div className="modal-action flex-wrap justify-center w-full gap-10">
          
        <form method="dialog" className="flex flex-col w-full">
          <div className="w-full text-left">
            <label className="control-label font-[600] ">Monthly</label>

            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="text"
                name="monthly"
                value={boardingPayload?.monthly}
                onChange={handleInputChange}                  
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Quarterly</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="text"
                name="quarterly"
                value={boardingPayload?.quarterly}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Half Yearly</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="text"
                name="halfYearly"
                value={boardingPayload?.halfYearly}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Yearly</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="text"
                name="yearly"
                value={boardingPayload?.yearly}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Yearly</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="date"
                name="departedOn"
                value={boardingPayload?.departedOn.toString()}
                onChange={handleInputChange}
              />
            </div>
          </div>


        </form>

        <button
          className="btn w-[40%]"
          onClick={() => document.getElementById("addItemBoardingModal").close()}
        >
          Close
        </button>
        <button className="btn w-[40%]" onClick={handleModal}>
          Submit
        </button>
      </div>
    </div>
  </dialog>
  )
}

export default AddBoardingItem