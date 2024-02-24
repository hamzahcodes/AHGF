import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import AddWhatsAppReminder from "@components/customers/addWhatsAppReminder";


const ProfileStats = ({ customerData, total, recieved, id }) => {
  console.log(total);
  const [isGenerated, setIsGenerated] = useState(false);
  const pdfRef = useRef();
  const CustomerReport = dynamic(
    () => import("../../components/documents/pdf"),
    {
      loading: () => (
        <button className="bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]">
          Loading...
        </button>
      ),
    }
  );

  return (
    <>
      {customerData ? (
        <>
          <div className="flex justify-between items-center flex-wrap bg-[#fff] mx-2 w-auto rounded-xl my-2">
            <div className="flex justify-between items-center flex-wrap bg-[#fff] mx-2 w-full px-2 rounded-xl my-2">
              <div className="stat-value text-sm">
                Name: {customerData.basic_details.username}
              </div>
              <div className="stat-value text-sm">
                Phone: {customerData.basic_details.phone_no}
              </div>
            </div>
            <div className="flex justify-between bg-[#fff] rounded-xl items-center mx-2 w-full my-1 ">
              <div className="flex justify-center items-center flex-col p-2 ">
                <div className="stat-figure text-primary"></div>
                <div className="stat-title text-sm">Due Amount</div>
                <div className="stat-value text-accent text-xl">
                  ₹{total - recieved}
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>

              <div className="flex justify-center items-center flex-col p-2 ">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-title text-sm"> Amount Recieved</div>
                <div className="stat-value text-[#47BB78] text-xl">
                  + ₹{recieved}
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>

              <div className="flex justify-center items-center flex-col p-2 ">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-title text-sm"> Net Payable</div>
                <div className="stat-value text-[#F56565] text-xl">
                  {" "}
                  ₹{total}
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap w-full gap-x-1 mx-2 my-2">
              <div className="my-1 w-[48.5%]">
                {isGenerated ? (
                  <CustomerReport customerData={customerData} total={total} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGenerated(true);
                    }}
                    className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                  >
                    Delivery Note
                  </button>
                )}
              </div>

              <div className="my-1 w-[48.5%]">
                {isGenerated ? (
                  <CustomerReport customerData={customerData} total={total} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGenerated(true);
                    }}
                    className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                  >
                    Invoice
                  </button>
                )}
              </div>

              <div className="my-1 w-[48.5%]">
                {isGenerated ? (
                  <CustomerReport customerData={customerData} total={total} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGenerated(true);
                    }}
                    className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                  >
                    On boarding Form
                  </button>
                )}
              </div>

              <div className="my-1 w-[48.5%]">
                {isGenerated ? (
                  <CustomerReport customerData={customerData} total={total} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGenerated(true);
                    }}
                    className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                  >
                    Report
                  </button>
                )}
              </div>

              <div className="my-1 w-[48.5%]">
                {/* {isGenerated ? (
                <CustomerReport customerData={customerData} total={total} />
              ) : (
                <button
                  onClick={() => {
                    setIsGenerated(true);
                  }}
                  className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                >
                  Delivery Note
                </button>
              )} */}
                <button
                  onClick={() =>
                    document.getElementById("send_whatsapp").showModal()
                  }
                  type="submit"
                  className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                >
                  Send
                </button>
                <AddWhatsAppReminder custId={id} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
};

export default ProfileStats;
