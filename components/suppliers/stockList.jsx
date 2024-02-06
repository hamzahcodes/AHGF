import React from "react";
import AddStockDetailsDialog from "./addStockDetailsDialog";
// import AddGoatDetailsDialog from './addGoatDetailsDialog'

const StockList = ({ data, id }) => {
  console.log("====================================");
  console.log(data, "STOCK");
  console.log("====================================");
  return (
    <>
      <section className="text-primary bg-[#fff] mx-2 rounded-xl body-font supplier__table">
        <div className="container px-2 pt-4  mx-auto">
          <div className="lg:w-2/3 w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Stock
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Quantity
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((data, key) => (
                  <tr key={key} className="border-b-2 border-secondary">
                    <td className="px-4 py-3">{data.name}</td>
                    <td className="px-4 py-3">{data.quantity}</td>
                    <td className="px-4 py-3">{data.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <button
        onClick={() => document.getElementById("addStockModal").showModal()}
        className="text-5xl flex justify-center items-center fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-accent text-[#fff]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      <AddStockDetailsDialog id={id} />

      {/* <AddGoatDetailsDialog id={id} /> */}
    </>
  );
};

export default StockList;
