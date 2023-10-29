'use client'

import CustomerHero from '@/components/customers/customerHero';
import Layout from '@components/ParentDrawer/Layout'
import React , {useEffect , useState , useContext} from 'react'
import AuthContext from '@store/auth-context';

const CustomerId = ({params}) => {
  const [customerData, setCustomerData] = useState(null);
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
      <CustomerHero customerData={customerData && customerData[0]} />
    </Layout>
   
  )
}

export default CustomerId