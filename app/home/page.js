import Layout from '@components/ParentDrawer/Layout'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <Layout>

      <div className=' m-auto flex justify-center items-center h-[100vh]'>
        {/* <div className='flex justify-center items-center flex-wrap w-[90%]  gap-4'>
          <Link className='bg-[#A9A9A9] shadow-3xl rounded-xl p-8 w-[40%] flex justify-center items-center' href='/customers'>
            Customers
          </Link>

          <Link className='bg-[#A2678A] shadow-3xl rounded-xl p-8 w-[40%] flex justify-center items-center' href='/suppliers'>
            Suppliers
          </Link>

          <Link className='bg-[#FF9130] shadow-3xl rounded-xl p-8 w-[40%] flex justify-center items-center' href='/staff'>
            Staff
          </Link>

          <Link className='bg-[#FF5B22] shadow-3xl rounded-xl p-8 w-[40%] flex justify-center items-center' href='/stock'>
            Stock
          </Link>


        </div> */}
      </div>

    </Layout>
    
  )
}

export default Page