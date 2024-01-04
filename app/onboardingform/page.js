'use client'
import React, { useState, useEffect } from 'react'
import Layout from '@components/ParentDrawer/Layout'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import AddGoatItem from '@components/OnboardingForm/AddGoatItem'
import AddBoardingItem from '@components/OnboardingForm/AddBoardingItem'
import OnboardingFormPdf from '@components/OnboardingForm/OnboardingFormPdf'

const page = () => {

  const [isClient, setIsClient] = useState(false)
  const [ boardingDetails, setBoardingDetails ] = useState({
    boardingNumber: 0,
    boardingDate: new Date().toLocaleDateString("en-IN"),
    ownerName: "",
    ownerPhone: 0,
    ownerEmail: "",
    ownerAddress: "",
    absentOwner1Name: "",
    absentOwner1Phone: 0,
    absentOwner2Name: "",
    absentOwner2Phone: 0
  });

  const [goatArray, setGoatArray] = useState([]);
  const [goatPayload, setGoatPayload] = useState({
      goatDate: new Date(),
      quantity: 0,
      breed: 0,
      gender: "Male",
      type: "Andul",
      weight: 0,
      height: 0
    });

  const [ boardingTypeArray, setBoardingTypeArray ] = useState([]);
  const [ boardingPayload, setBoardingPayload ] = useState({
    monthly: "",
    quarterly: "",
    halfYearly: "",
    yearly: "",
    departedOn: new Date()
  });

  const handleBoardingDetailsChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBoardingDetails({ ...boardingDetails, [name]: value });
  };

  const handleGoatPayloadChange = (newItemPayload) => {
    setGoatPayload(newItemPayload);
  };

  const handleGoatModal = (e) => {
    e.preventDefault();

    console.log(goatPayload);

    setGoatArray([...goatArray, goatPayload]);
    setGoatPayload({ goatDate: new Date(), quantity: 0, breed: 0, gender: "Male", type: "Andul", weight: 0, height: 0});
    document.getElementById("addItemGoatModal").close();
    alert("Item added successfully");
  };

  const handleBoardingPayloadChange = (newItemPayload) => {
    setBoardingPayload(newItemPayload)
  }

  const handleBoardingModal = (e) => {
    e.preventDefault();

    console.log(boardingPayload);

    setBoardingTypeArray([...boardingTypeArray, boardingPayload]);
    setBoardingPayload({ monthly: "", quarterly: "", halfYearly: "", yearly: "", departedOn: new Date()});
    document.getElementById("addItemBoardingModal").close();
    alert("Item added successfully");
  };

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Layout>
    <div className="w-100 p-5 pb-10 border-2 border-x-indigo-400 border-y-indigo-500">
      {/* <PDFViewer className='fixed w-full h-full z-[5]'>
          <OnboardingFormPdf boardingDetails={boardingDetails} goatArray={goatArray} boardingTypeArray={boardingTypeArray} />
      </PDFViewer>  */}
      <h2 className="text-center mb-3">Boarding Agreement</h2>
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Boarding Number
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="boardingNumber"
              value={boardingDetails.boardingNumber !== 0 ? boardingDetails.boardingNumber : ''}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              name="boardingDate"
              value={boardingDetails.boardingDate}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

        </div>
      </form>
        
        <div className='flex justify-around items-center p-3 bg-gray-50 border border-gray-400 w-full rounded-lg mt-4 mb-2'>
            <h2>Goat Owner Details</h2>
          </div>

      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="ownerName"
              value={boardingDetails.ownerName}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="ownerPhone"
              value={boardingDetails.ownerPhone !== 0 ? boardingDetails.ownerPhone : ""}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="ownerEmail"
              value={boardingDetails.ownerEmail}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="ownerAddress"
              value={boardingDetails.ownerAddress}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

        </div>
      </form>     

      <div className='flex justify-around items-center p-3 bg-gray-50 border border-gray-400 w-full rounded-lg mt-4 mb-2'>
            <h2>In absence of Owner Contact Details</h2>
          </div>

      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Contact Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="absentOwner1Name"
              value={boardingDetails.absentOwner1Name}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="absentOwner1Phone"
              value={boardingDetails.absentOwner1Phone !== 0 ? boardingDetails.absentOwner1Phone : ""}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Second Contact Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="absentOwner2Name"
              value={boardingDetails.absentOwner2Name}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

          <div className="w-full md:w-1/2 px-3 my-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="absentOwner2Phone"
              value={boardingDetails.absentOwner2Phone !== 0 ? boardingDetails.absentOwner2Phone : ""}
              onChange={handleBoardingDetailsChange}
            ></input>
          </div>

        </div>
      </form> 

      <div className='flex justify-around items-center p-3 bg-gray-50 border border-gray-400 w-full rounded-lg my-4 mt-10'>
        <h2>Goat Details</h2>
        <button
                onClick={() => document.getElementById("addItemGoatModal").showModal()}
                className="input input-bordered w-24 md:w-auto text-sm bg-secondary text-white"
            >
                Add Item
        </button>
        <AddGoatItem handleModal={handleGoatModal} itemPayload={goatPayload} handleGoatPayloadChange={handleGoatPayloadChange} />

      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-400">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Breed
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Weight
              </th>
              <th scope="col" className="px-6 py-3">
                Height
              </th>
            </tr>
          </thead>

          <tbody>
            {goatArray.map((item) => {
              return (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.goatDate}
                </th>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.breed}</td>
                <td className="px-6 py-4">{item.gender}</td>
                <td className="px-6 py-4">{item.type}</td>
                <td className="px-6 py-4">{item.weight}</td>
                <td className="px-6 py-4">{item.height}</td>
              </tr>
            )})}
          </tbody>

        </table>
      </div>

      <div className='flex justify-around items-center p-3 bg-gray-50 border border-gray-400 w-full rounded-lg my-4 mt-10'>
        <h2>Boarding Details</h2>
        <button
                onClick={() => document.getElementById("addItemBoardingModal").showModal()}
                className="input input-bordered w-24 md:w-auto text-sm bg-secondary text-white"
            >
                Add Item
        </button>
        <AddBoardingItem handleModal={handleBoardingModal} boardingPayload={boardingPayload} handleBoardingPayloadChange={handleBoardingPayloadChange} />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-400">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Monthly
              </th>
              <th scope="col" className="px-6 py-3">
                Quarterly
              </th>
              <th scope="col" className="px-6 py-3">
                Half-Yearly
              </th>
              <th scope="col" className="px-6 py-3">
                Yearly
              </th>
              <th scope="col" className="px-6 py-3">
                Departed On
              </th>
            </tr>
          </thead>

          <tbody>
            {boardingTypeArray.map((item) => {
              return (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.monthly}
                </th>
                <td className="px-6 py-4">{item.quarterly}</td>
                <td className="px-6 py-4">{item.halfYearly}</td>
                <td className="px-6 py-4">{item.yearly}</td>
                <td className="px-6 py-4">{item.departedOn}</td>
              </tr>
            )})}
          </tbody>

        </table>
      </div>

      <div className="w-full flex justify-center items-center mt-10 p-4">
      {isClient && (
            <PDFDownloadLink 
              className='bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] my-10'
              document={<OnboardingFormPdf boardingDetails={boardingDetails} goatArray={goatArray} boardingTypeArray={boardingTypeArray} />}
              fileName={`${boardingDetails.ownerName}_OnboardingForm.pdf`}
            >
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download OnBoarding Form')}
          </PDFDownloadLink>
          )}
      </div>
      
    </div>
    
  </Layout>
  )
}

export default page