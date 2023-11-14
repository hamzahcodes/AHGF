'use client'
import React, { useEffect, useState, useContext } from 'react'
import Layout from '@components/ParentDrawer/Layout'
import CustomerList from '@components/customers/customerList'
import AuthContext from '@store/auth-context'
import Link from 'next/link'
import AddCustomerDialog from '@components/customers/addCustomerDialog'
import Stats from '@components/customers/stats'
import LoadingSpinner from '@components/ui/loadingSpinner'
import { useQuery } from '@tanstack/react-query'
import { getAllCustomers } from '@helper/http'



const Page = () => {
    const [customerData, setCustomerData] = useState(null);
    const context = useContext(AuthContext);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['customers', context.isLoggedIn.token],
        queryFn: () => (context.isLoggedIn.status) && getAllCustomers({ token: context.isLoggedIn.token })
    })


    return (
        <>
            <Layout>

            <div>
                    <button onClick={() => document.getElementById('sort_modal').showModal()} className='bg-[pink] p-6 rounded-xl'>Sort</button>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                  
                    <dialog id="sort_modal" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Sort By:</h3>

                            <div className='flex justify-center items-start flex-col my-4'>
                              

                                    <h3 name='sort' onClick={() => { document.getElementById('sort_modal').close() }} className='border-b-[0.1px] py-4 w-full'>Date (latest first)</h3>
                               
                             

                             
                                    <h3 name='sort' onClick={() => { document.getElementById('sort_modal').close() }} className='border-b-[0.1px] py-4 w-full'>Date (oldest first)</h3>
                               

                             
                             
                                    <h3 name='sort' onClick={() => { document.getElementById('sort_modal').close() }} className='border-b-[0.1px] py-4 w-full'>Pending (high to low)</h3>
                                

                            
                                    <h3 name='sort' onClick={() => { document.getElementById('sort_modal').close() }} className='border-b-[0.1px] py-4 w-full'>Pending (low to high)</h3>
                               

                              



                            </div>
                            
                        </div>
                       
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
            </div>

                {
                    data ? (
                        <div className='relative'>
                            <div className=' w-full'>
                                <Stats />

                            </div>

                            <CustomerList customerData={data} />


                        </div>

                    ) : (
                        <LoadingSpinner />
                    )
                }




                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className='text-5xl fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-[#0096D6] text-[#fff]'>+</button>

                <AddCustomerDialog />



            </Layout>
        </>
    )
}

export default Page