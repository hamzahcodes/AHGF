import React from 'react'
import AddSuppliersTransactionDialog from './addSuppliersTransactionDialog'


const SupplierTransactionList = ({ data, id, total }) => {
    return (
        <>
            <div  >
                <div className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>


                    <div className='w-[80%] flex justify-between'>
                        <h2 className='min-w-[30%]'>Payout Date</h2>

                        {/* <h3 className=''>Balance</h3> */}
                        <h3 className=''>Payment</h3>

                    </div>


                </div>

            </div>

            {
                data?.map((data, key) => (
                    <div key={key} >
                        <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>


                            <div className='w-[80%] flex justify-between'>

                                <h2 className='min-w-[30%]'>{new Date(data.paymentDate).toLocaleDateString().toString()}</h2>

                                {/* <h3 className='text-[crimson]'>{data.balance}</h3> */}
                                <h3 className='text-[seagreen]'>{data.payment}</h3>

                            </div>


                        </div>

                    </div>

                ))
            }


            <button onClick={() => { total === 0 ? alert('To add a transcation please set a total amount in Goat specificities tab...') : document.getElementById('add_supplier_transaction').showModal() }} className='flex justify-center items-center text-5xl fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-accent text-[#fff]'>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>


            </button>

            <AddSuppliersTransactionDialog id={id} />

           



        </>

    )
}

export default SupplierTransactionList