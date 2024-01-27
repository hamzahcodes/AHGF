import React from "react";

const SupplierStats = ({ supplierData, total, paymentMade }) => {
  console.log(total);

  return (
    <>
      {supplierData ? (
        <div className="stats shadow flex flex-col">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>

              <div className="stat-title text-primary">
                {supplierData.supplierName}
              </div>
              <div className="stat-title">{supplierData.supplierPhone}</div>
            </div>
            <div className="stat-value">₹{total - paymentMade}</div>
            <div className="stat-title">↑Due Amount</div>

            <div className="stat-value text-[#47BB78] text-sm">
              + ₹{paymentMade} <br /> Amount paid
            </div>

            <div className="stat-value text-[#F56565] text-sm">
              ₹{total} <br />
              Net Payable
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
