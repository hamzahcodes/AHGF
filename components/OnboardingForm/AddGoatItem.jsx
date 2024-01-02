import React from 'react'

const AddGoatItem = ({ handleModal, goatPayload, handleGoatPayloadChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleGoatPayloadChange((goatPayload) => ({ ...goatPayload, [name]: value }));
  }

  return (
    <dialog id="addItemGoatModal" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Item Details</h3>
      <div className="modal-action flex-wrap justify-center w-full gap-10">
          
        <form method="dialog" className="flex flex-col w-full">
          <div className="w-full text-left">
            <label className="control-label font-[600] ">Item</label>

            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="date"
                name="goatDate"
                value={goatPayload?.goatDate.toString()}
                onChange={handleInputChange}                  
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Quantity</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="number"
                name="quantity"
                value={goatPayload?.quantity !== 0 ? goatPayload?.quantity : ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Breed</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="text"
                name="breed"
                value={goatPayload?.breed}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Gender</label>
            <div className="">
              <select name="gender" className="border-2 w-full sm:text-md mt-2 px-4 py-2">
                <option value="volvo">Male</option>
                <option value="saab">Female</option>
              </select>
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Type</label>
            <div className="">
              <select name="type" className="border-2 w-full sm:text-md mt-2 px-4 py-2">
                <option value="Andul">Andul</option>
                <option value="Khassi">Khassi</option>
              </select>
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Weight</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="number"
                name="weight"
                value={goatPayload?.weight}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Height</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="number"
                name="height"
                value={goatPayload?.height}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>

        <button
          className="btn w-[40%]"
          onClick={() => document.getElementById("addItemGoatModal").close()}
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

export default AddGoatItem