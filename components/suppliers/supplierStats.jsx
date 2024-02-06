import React from "react";

const SupplierStats = ({ supplierData, total, paymentMade }) => {
  console.log(total);

  return (
    <>
      {supplierData ? (
        <div className="flex justify-between items-center flex-wrap bg-[#fff] mx-2 w-auto rounded-xl my-4">
          <div className="flex justify-between bg-[#fff] rounded-xl items-center mx-2 w-full my-1 ">
            <div className="flex justify-center items-center flex-col p-2 ">
              <div className="stat-figure text-primary"></div>
              <div className="stat-title text-sm">Due Amount</div>
              <div className="stat-value text-accent text-xl">
                ₹{total - paymentMade}
              </div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

            <div className="flex justify-center items-center flex-col p-2 ">
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title text-sm"> Amount paid</div>
              <div className="stat-value text-[#47BB78] text-xl">
                + ₹{paymentMade}
              </div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>

            <div className="flex justify-center items-center flex-col p-2 ">
              <div className="stat-figure text-secondary"></div>
              <div className="stat-title text-sm"> Net Payable</div>
              <div className="stat-value text-[#F56565] text-xl"> ₹{total}</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>

         
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
};

export default SupplierStats;
