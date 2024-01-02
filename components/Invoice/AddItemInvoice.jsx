import React from 'react'

const AddItemInvoice = ({ handleModal, itemPayload, handleItemPayloadChange }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleItemPayloadChange((itemPayload) => ({ ...itemPayload, [name]: value }));
  }

  return (
    <dialog id="addItemInvoiceModal" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Item Details</h3>
      <div className="modal-action flex-wrap justify-center w-full gap-10">
          
        <form method="dialog" className="flex flex-col w-full">
          <div className="w-full text-left">
            <label className="control-label font-[600] ">Item</label>

            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="text"
                name="desc"
                value={itemPayload.desc}
                onChange={handleInputChange}                  
              />
              {itemPayload.name === false && (
                <span
                  className="text-[red]"
                  data-valmsg-for="UserName"
                  data-valmsg-replace="true"
                >
                  Item Name is required
                </span>
              )}
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Quantity</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="number"
                name="quantity"
                value={itemPayload.quantity !== 0 ? itemPayload.quantity : ''}
                onChange={handleInputChange}
              />
              {itemPayload.phone === false && (
                <span className="text-[red]">Quantity is required</span>
              )}
            </div>
          </div>

          <div className="w-full text-left">
            <label className="control-label font-[600] ">Price</label>
            <div className="">
              <input
                className="border-2 w-full sm:text-md mt-2 px-4 py-2"
                type="number"
                name="price"
                value={itemPayload.price !== 0 ? itemPayload.price : ''}
                onChange={handleInputChange}
              />
              {itemPayload.phone === false && (
                <span className="text-[red]">Price is required</span>
              )}
            </div>
          </div>
        </form>

        <button
          className="btn w-[40%]"
          onClick={() => document.getElementById("addItemInvoiceModal").close()}
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

export default AddItemInvoice