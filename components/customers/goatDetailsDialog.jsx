import React from "react";

const GoatDetailsDialog = ({ activeCard, setIsEdit, isEdit }) => {
  const editHandler = () => {
    document.getElementById("goat_card").close();
    setIsEdit({ ...isEdit, status: true, data: activeCard });
  };
  const deleteHandler = () => {};
  return (
    <dialog id="goat_card" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Goat Details</h3>

        <div className="flex flex-wrap justify-between items-center gap-y-4 my-6">
          <div className="w-[48%]">
            <h3 className="font-semibold">Goat type:</h3>
            <p className="pl-2">{activeCard.goat_type}</p>
          </div>

          <div className="w-[48%]">
            <h3 className="font-semibold">Palaai type:</h3>
            <p className="pl-2">{activeCard.palaai_type}</p>
          </div>

          <div className="w-[48%]">
            <h3 className="font-semibold">Breed:</h3>
            <p className="pl-2">{activeCard.breed}</p>
          </div>

          <div className="w-[48%]">
            <h3 className="font-semibold">Gender:</h3>
            <p className="pl-2">{activeCard.gender}</p>
          </div>

          <div className="w-[48%]">
            <h3 className="font-semibold">Quantity:</h3>
            <p className="pl-2">{activeCard.quantity} </p>
          </div>

          <div className="w-[48%]">
            <h3 className="font-semibold">Height:</h3>
            <p className="pl-2">{activeCard.height}</p>
          </div>

          <div className="w-[48%]">
            <h3 className="font-semibold">Weight:</h3>
            <p className="pl-2">{activeCard.weight}</p>
          </div>
        </div>

        <form>
          <div className="w-full flex justify-around items-center">
            <button type="button" onClick={editHandler} className="btn w-[40%]">
              Edit
            </button>
            <button
              type="button"
              onClick={deleteHandler}
              className="btn bg-[#e64364] text-[#fff] w-[40%]"
            >
              Delete
            </button>
          </div>
        </form>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="modal-backdrop"
      >
        <button
          onClick={() => {
            document.getElementById("goat_card").close();
          }}
        >
          close
        </button>
      </form>
    </dialog>
  );
};

export default GoatDetailsDialog;
