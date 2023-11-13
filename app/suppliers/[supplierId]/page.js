'use client'

import CustomerHero from '@/components/customers/customerHero';
import Layout from '@components/ParentDrawer/Layout'
import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '@store/auth-context';
import ProfileStats from '@components/customers/profileStats';
import GoatList from '@components/customers/goatList';
import TransactionList from '@components/customers/transactionList';
import LoadingSpinner from '@components/ui/loadingSpinner';
import { getCustomerById , getSupplierById } from '@helper/http';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import SupplierTransactionList from '@components/suppliers/supplierTransactionList';
import SupplierStats from '@components/suppliers/supplierStats';

const SupplierId = ({ params }) => {
    const [customerData, setCustomerData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const context = useContext(AuthContext);
    const router = useRouter()

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['supplier', context.isLoggedIn.token],
        queryFn: () => (context.isLoggedIn.status) && getSupplierById({ token: context.isLoggedIn.token, id: params.supplierId })
    })

    console.log(data);
    let total = data && data[0].stockDetails?.map(record => record.price).reduce((total, price) => total + price, 0);
    let paymentMade = data && data[0].financialTransactions?.map(record => record.payment).reduce((total, payment) => total + payment, 0);




    return (
        <Layout>
            {console.log(total, paymentMade)}
            {
                data ? (
                    <>
                        <SupplierStats supplierData={data} total={total} paymentMade={paymentMade} />

                        <div>
                            <div className="tabs tabs-boxed w-full">
                                <div onClick={() => { setActiveTab(0) }} className={`tab w-[50%] ${!activeTab && 'tab-active'}`}>Transaction Details</div>
                                <div onClick={() => { setActiveTab(1) }} className={`tab w-[50%] ${activeTab && 'tab-active'}`}>Stock Specifities</div>
                            </div>
                        </div>

                       
                                
                    {
                        activeTab ? (
                            // goat list to be changed with stock list
                            <GoatList data={data && data[0].stockDetails} id={params.supplierId} />
                        ) :
                        (
                            <SupplierTransactionList data={data && data[0].financialTransactions} id={params.supplierId}  />    
                        )
                    }   
                        
                    </>


                ) : (


                    <LoadingSpinner />

                )
            }



        </Layout>

    )
}

export default SupplierId