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
import {  getAllSuppliers } from '@helper/http'
import SupplierList from '@components/suppliers/supplierList'
import AddSupplierDialog from '@components/suppliers/addSupplierDialog'





const Page = () => {
    const [customerData, setCustomerData] = useState(null);
    const context = useContext(AuthContext);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['suppliers', context.isLoggedIn.token],
        queryFn: () => (context.isLoggedIn.status) && getAllSuppliers({ token: context.isLoggedIn.token })
    })
  return (
      <>
          <Layout>
              {
                  data ? (
                      <div className='relative'>
                          <div className='sticky left-0 w-full top-0 ]'>
                              <Stats />

                          </div>

                          <SupplierList supplierData={data} />


                      </div>

                  ) : (
                      <LoadingSpinner />
                  )
              }




              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button onClick={() => document.getElementById('add_supplier_modal').showModal()} className='text-5xl fixed bottom-[10%] right-[5%] w-[70px] h-[70px] rounded-full bg-[#0096D6] text-[#fff]'>+</button>

              <AddSupplierDialog />



          </Layout>
      </>
  )
}

export default Page