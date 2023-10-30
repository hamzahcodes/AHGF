'use client'

import CustomerHero from '@/components/customers/customerHero';
import Layout from '@components/ParentDrawer/Layout'
import React , {useEffect , useState , useContext} from 'react'
import AuthContext from '@store/auth-context';
import ProfileStats from '@components/customers/profileStats';
import GoatList from '@components/customers/goatList';
import TransactionList from '@components/customers/transactionList';
import LoadingSpinner from '@components/ui/loadingSpinner';
import { getCustomerById } from '@helper/http';
import { useQuery } from '@tanstack/react-query';

const CustomerId = ({params}) => {
  const [customerData, setCustomerData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const context = useContext(AuthContext);

  const {data , error , isPending , isError} = useQuery({
    queryKey:['customer'],
    queryFn:()=> getCustomerById({token:context.isLoggedIn.token,id:params.customerId})
  })

 

  
  
  return (
    <Layout>
    {
      !isPending ? (
        <>
            <ProfileStats customerData={data && data[0]} />
          
            <div>
              <div className="tabs tabs-boxed w-full">
                <div onClick={() => { setActiveTab(0) }} className={`tab w-[50%] ${!activeTab && 'tab-active'}`}>Transaction Details</div>
                <div onClick={() => { setActiveTab(1) }} className={`tab w-[50%] ${activeTab && 'tab-active'}`}>Goat Specifities</div>
              </div>
            </div>

            {
              activeTab ? (
                <GoatList data={data && data[0].goat_details} />
              ) :
                (
                  <TransactionList data={data && data[0].financial_details} />
                )
            }
        </>
        

      ):(
        

        <LoadingSpinner/>
        
      )
    }
   


    </Layout>
   
  )
}

export default CustomerId