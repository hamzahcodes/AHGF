'use client'
import React, { useEffect, useState, useContext } from 'react'
import Layout from '@components/ParentDrawer/Layout'
import CustomerList from '@components/customers/customerList'
// import AuthContext from '@store/auth-context'
import Link from 'next/link'
import AddCustomerDialog from '@components/customers/addCustomerDialog'
import Stats from '@components/customers/stats'
import LoadingSpinner from '@components/ui/loadingSpinner'
import { useQuery } from '@tanstack/react-query'
import { getAllCustomers } from '@helper/http'
import AddItem from '@components/DeliveryNote/AddItem'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'



const Page = () => {

    const { data: session } = useSession()
    if(!session?.user?.id) redirect("/login")

    const [searchList, setSearchList] = useState([]);
    // const context = useContext(AuthContext);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['customers'],
        queryFn: () => getAllCustomers()
    })

    if (isError) {
        console.log('error in fetching all customers');
    }
    let flag = true, deTimeout;


    const debounce = (e) => {
        console.log('====================================');
        console.log(e.target.value);
        console.log('====================================');
        const searchWord = e.target.value;
        const newFilter = data.filter((value) => {
            return value.basic_details.username.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === '') {
            setSearchList([])
            return
        }
        setSearchList(newFilter);

    }


    const searchHandler = (e) => {
        flag = false;
        clearTimeout(deTimeout)

        deTimeout = setTimeout(() => {
            flag = true
            if (flag) {
                debounce(e)

            }


        }, 500);




    }

    return (
        <>
            <Layout>

                <div className='flex justify-center items-center w-full'>
                    <div className='flex justify-center items-center w-full flex-col relative '>
                        <input onChange={searchHandler} placeholder='search by name...' className='rounded-xl p-2 my-4 w-[90%] border-secondary border-2' type="text" />
                        <div className='bg-[grey] rounded-xl w-[90%] absolute top-[100%] z-[1]'>
                            {searchList.length > 0 && searchList.map((data, key) => {
                                let paid = data.financial_details.map(record => record.amount).reduce((total, amount) => total + amount, 0);
                                let total = data.goat_details.map(record => record.total_amount).reduce((total, amount) => total + amount, 0);

                                return (
                                    <Link className='w-[90%] ' key={key} href={`/customers/${data._id}`}>
                                        <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray] rounded-xl'>


                                            <div className='w-[80%] flex justify-between'>
                                                <h2 className='min-w-[30%]'>{data.basic_details.username}</h2>

                                                <h3 className='text-primary'>+₹{paid}</h3>
                                                <h3 className='text-[red]'>₹{total - paid}</h3>
                                            </div>


                                        </div>

                                    </Link>

                                )




                            })}

                        </div>
                       

                    </div>

                    {/* <button onClick={() => document.getElementById('sort_modal').showModal()} className='bg-primary p-2 rounded-xl'>Search</button> */}
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
                            {/* <div className=' w-full'>
                                <Stats />

                            </div> */}

                            <CustomerList customerData={ data} />


                        </div>

                    ) : (
                        <LoadingSpinner />
                    )
                }




                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className='text-5xl fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-accent text-[#fff]'>+</button>

                <AddCustomerDialog />


            </Layout>
        </>
    )
}

export default Page