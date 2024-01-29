import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";

const ProfileStats = ({ customerData, total, recieved }) => {
  console.log(total);
  const [isGenerated, setIsGenerated] = useState(false);
  const pdfRef = useRef();
  const CustomerReport = dynamic(() => import("../../components/documents/pdf"), {
    loading: () => (
      <button
       
        className="bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]"
      >
        Loading...
      </button>
    ),
  });

  return (
    <>
      {customerData ? (
        <div className="stats shadow flex flex-col">
          {/* <PDFViewer className='fixed w-full h-full z-[5]'>
                        <Pdf customerData={customerData} total={total} />

                    </PDFViewer> */}
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>

              <div className="stat-title text-primary">
                {customerData.basic_details.username}
              </div>
              <div className="stat-title">
                {customerData.basic_details.phone_no}
              </div>
              <div className="stat-title mt-4">
                {isGenerated ? (
                  <CustomerReport customerData={customerData} total={total} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGenerated(true);
                    }}
                    className="bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]"
                  >
                    Generate
                  </button>
                )}
              </div>
            </div>
            <div className="stat-value">₹{total - recieved}</div>
            <div className="stat-title">↑Due Amount</div>

            <div className="stat-value text-[#47BB78] text-sm">
              + ₹{recieved} <br /> Amount paid
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

export default ProfileStats;
