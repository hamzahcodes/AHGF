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

    let total = data && data.financialTransactions?.map(record => record.balance).reduce((total, amount) => total + amount, 0);
    let recieved = data && data.financialTransactions?.map(record => record.payment).reduce((total, amount) => total + amount, 0);




    return (
        <Layout>
            {
                data ? (
                    <>
                        <SupplierStats supplierData={data} total={total} recieved={recieved} />

                        {/* <div>
                            <div className="tabs tabs-boxed w-full">
                                <div onClick={() => { setActiveTab(0) }} className={`tab w-[50%] ${!activeTab && 'tab-active'}`}>Transaction Details</div>
                                <div onClick={() => { setActiveTab(1) }} className={`tab w-[50%] ${activeTab && 'tab-active'}`}>Goat Specifities</div>
                            </div>
                        </div> */}

                       
                                
                    <SupplierTransactionList data={data && data.financialTransactions} id={params.supplierId}  />
                                
                        
                    </>


                ) : (


                    <LoadingSpinner />

                )
            }



        </Layout>

    )
}

export default SupplierId