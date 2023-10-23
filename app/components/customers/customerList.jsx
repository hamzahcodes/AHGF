import React from 'react'
import Link from 'next/link'
const CustomerList = ({customerData}) => {
  return (
    <div className='flex w-full flex-col'>

    {customerData?.map(data => (
        <Link href={`/customers/${data._id}`}>
            <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>
                <div className={`bg-[purple] sm:w-[60px] w-[40px] h-[40px] sm:h-[60px] rounded-[100%] flex justify-center items-center text-white sm:text-[2.4rem] `}>
                    {data.basic_details.username[0]}
                </div>

                <div className='w-[80%] flex justify-between'>
                    <h2>{data.basic_details.username}</h2>

                    <h3>₹{data.financial_details[data.financial_details.length - 1].amount}</h3>
                </div>
            </div>

        </Link>

       

    ))}



       



    </div>
  )
}

export default CustomerList