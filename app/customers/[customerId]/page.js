'use client'

import CustomerHero from '@/components/customers/customerHero';
import Layout from '@/components/layout';
import React , {useEffect , useState} from 'react'

const CustomerId = ({params}) => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    getCustomerById(params.customerId)
    
  }, []);



  const getCustomerById = async (id) => {
    try {
      const response = await fetch('/api/customers/?custID='+id)
      const resp = await response.json();
      console.log(resp)
      if (response.status === 200) {
        setCustomerData(resp.message)

      }

    } catch (error) {
      console.log(error)

    }
  }
  
  return (
    <Layout>
      <CustomerHero customerData={customerData} />
    </Layout>
   
  )
}

export default CustomerId