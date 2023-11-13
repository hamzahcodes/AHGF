import React, { useState, useEffect } from 'react'
import Link from 'next/link'
const SupplierList = ({ supplierData }) => {
    const [paidAmount, setPaidAmount] = useState('');
    console.log('====================================');
    console.log(supplierData);
    console.log('====================================');

    return (
        <div className='flex w-full flex-col'>

            {supplierData?.map((data, key) => {
                let paid = data.financialTransactions.map(record => record.payment).reduce((total, payment) => total + payment, 0);
                let total = data.stockDetails.map(record => record.price).reduce((total, price) => total + price, 0); 

                return (
                    <Link key={key} href={`/suppliers/${data._id}`}>
                        <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>
                            <div className={`bg-[#37D39A] sm:w-[60px] w-[40px] h-[40px] sm:h-[60px] rounded-[100%] flex justify-center items-center text-white sm:text-[2.4rem] `}>
                                {data.supplierName[0]}
                            </div>

                            <div className='w-[80%] flex justify-between'>
                                <h2 className='min-w-[30%]'>{data.supplierName}</h2>

                                <h3 className='text-[seagreen]'>+₹{paid}</h3>
                                <h3 className='text-[red]'>₹{total - paid}</h3>
                            </div>


                        </div>

                    </Link>

                )




            })}







        </div>
    )
}

export default SupplierList