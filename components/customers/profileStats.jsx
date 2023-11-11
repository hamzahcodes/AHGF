import React from 'react'
import Pdf from '@components/documents/pdf';
import { PDFDownloadLink,PDFViewer } from '@react-pdf/renderer';
const ProfileStats = ({ customerData, total, recieved }) => {
    console.log(total)


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

                            <div className="stat-title text-primary">{customerData.basic_details.username}</div>
                            <div className="stat-title">{customerData.basic_details.phone_no}</div>
                            <div className="stat-title mt-4">

                            <PDFDownloadLink className='bg-[seagreen]  text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]'
                                    document={<Pdf customerData={customerData} total={total} />} fileName={`${customerData.basic_details.username}.pdf`}>
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                            </PDFDownloadLink>
                            </div>
                        </div>
                        <div className="stat-value">₹{total - recieved}</div>
                        <div className="stat-title">↑Due Amount</div>

                        <div className="stat-value text-secondary text-sm">+  ₹{recieved} <br /> Amount paid</div>

                        <div className="stat-value text-primary text-sm">₹{total} <br />Net Payable</div>


                    </div>







                </div>


            ) : (
                <h2>loading</h2>

            )}

        </>

    )
}

export default ProfileStats