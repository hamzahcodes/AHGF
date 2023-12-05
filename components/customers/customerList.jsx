import React , {useState , useEffect} from 'react'
import Link from 'next/link'
const CustomerList = ({customerData}) => {
    const [paidAmount, setPaidAmount] = useState('');

  return (
    <div className='scrollList flex w-full flex-col ' >

    {customerData?.map((data,key) => {
        let paid = data.financial_details.map(record => record.amount).reduce((total, amount) => total + amount, 0);
        let total = data.goat_details.map(record => record.total_amount).reduce((total, amount) => total + amount, 0);

        return (
            <Link key={key} href={`/customers/${data._id}`}>
                <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>
                    <div className={`bg-secondary sm:w-[60px] w-[40px] h-[40px] sm:h-[60px] rounded-[100%] flex justify-center items-center text-white sm:text-[2.4rem] `}>
                        {data.basic_details.username[0]}
                    </div>

                    <div className='w-[80%] flex justify-between'>
                        <h2 className='min-w-[30%]'>{data.basic_details.username}</h2>

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

export default CustomerList