import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import AddWhatsAppReminder from "@components/customers/addWhatsAppReminder";
import { useRouter } from "next/navigation";


const ProfileStats = ({ customerData, total, recieved, id }) => {
  console.log(total);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGeneratedOnboardingForm, setIsGeneratedOnboardingForm] = useState(false);
  const router = useRouter();

  const OnboardingForm = dynamic(
    () => import("../../components/OnboardingForm/OnboardingFormPdf"),
    {
      loading: () => (
        <div className="my-1 w-[48.5%]">
          <button className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm 2xl:text-[0.5vw] w-full">
            Loading...
          </button>
        </div>
      )
    }
  )
  const CustomerReport = dynamic(
    () => import("../../components/documents/pdf"),
    {
      loading: () => (
        <div className="my-1 w-[48.5%] text-center">
          <button className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm 2xl:text-[0.5vw] w-full">
            Loading...
          </button>
        </div>
      ),
    }
  );

  const deliveryNotePage = (e) => {
    e.preventDefault();
    router.push('/deliverynote')
  }

  const invoicePage = (e) => {
    e.preventDefault();
    router.push('/invoice')
  }

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
              </div>

              <div className="flex justify-center items-center flex-col p-2 ">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-title text-sm"> Amount Recieved</div>
                <div className="stat-value text-[#47BB78] text-xl">
                  + ₹{recieved}
                </div>
              </div>

              <div className="flex justify-center items-center flex-col p-2 ">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-title text-sm"> Net Payable</div>
                <div className="stat-value text-[#F56565] text-xl">
                  {" "}
                  ₹{total}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap w-full gap-x-1 mx-2 my-2">
              <div className="my-1 w-[48.5%]">
                  <button
                    className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                    onClick={deliveryNotePage}
                  >
                    Delivery Note
                  </button>
              </div>

              <div className="my-1 w-[48.5%]">
                  <button
                    className="bg-primary  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                    onClick={invoicePage}
                  >
                    Invoice
                  </button>
              </div>

              <div className="my-1 w-[48.5%] text-center">
                {isGeneratedOnboardingForm ? (
                  <OnboardingForm boardingDetails={customerData.basic_details} goatArray={customerData.goat_details} boardingTypeArray={null} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGeneratedOnboardingForm(true);
                    }}
                    className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                  >
                    On boarding Form
                  </button>
                )}
              </div>

              <div className="my-1 w-[48.5%] text-center">
                {isGenerated ? (
                  <CustomerReport customerData={customerData} total={total} />
                ) : (
                  <button
                    onClick={() => {
                      setIsGenerated(true);
                    }}
                    className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
                  >
                    Report
                  </button>
                )}
              </div>

              <div className="my-1 w-[48.5%]">
                <button
                  onClick={() =>
                    document.getElementById("send_whatsapp").showModal()
                  }
                  type="submit"
                  className="bg-primary text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] w-full"
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
