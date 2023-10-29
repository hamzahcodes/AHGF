'use client'

import CustomerHero from '@/components/customers/customerHero';
import Layout from '@components/ParentDrawer/Layout'
import React , {useEffect , useState , useContext} from 'react'
import AuthContext from '@store/auth-context';
import ProfileStats from '@components/customers/profileStats';
import GoatList from '@components/customers/goatList';
import TransactionList from '@components/customers/transactionList';
import LoadingSpinner from '@components/ui/loadingSpinner';

const CustomerId = ({params}) => {
  const [customerData, setCustomerData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const context = useContext(AuthContext);

  useEffect(() => {
    getCustomerById(params.customerId)
    
  }, []);

  const getCustomerById = async (id) => {
    try {
      const response = await fetch('/api/customers/?custID=' + id, {

        // Adding method type
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + context.isLoggedIn.token,
          "Content-type": "application/json"
        },


      })
      const resp = await response.json();
      console.log(resp,"___")
      if (response.status === 200) {
        setCustomerData(resp.message)

      }

    } catch (error) {
      console.log(error)

    }
  }
  
  return (
    <Layout>
    {
      customerData !== null ? (
        <>
            <ProfileStats customerData={customerData && customerData[0]} />
            {/* <CustomerHero customerData={customerData && customerData[0]} /> */}
            <div>
              <div className="tabs tabs-boxed w-full">
                <div onClick={() => { setActiveTab(0) }} className={`tab w-[50%] ${!activeTab && 'tab-active'}`}>Transaction Details</div>
                <div onClick={() => { setActiveTab(1) }} className={`tab w-[50%] ${activeTab && 'tab-active'}`}>Goat Specifities</div>
              </div>
            </div>

            {
              activeTab ? (
                <GoatList data={customerData && customerData[0].goat_details} />
              ) :
                (
                  <TransactionList data={customerData && customerData[0].financial_details} />
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