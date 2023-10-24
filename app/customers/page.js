'use client'
import React , {useEffect , useState} from 'react'
import Layout from '../components/layout'
import CustomerList from '../components/customers/customerList'



const Page = () => {
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        getAllCustomers()
       
    }, []);


    const getAllCustomers =async () =>{
        try {
            const response = await fetch('/api/customers')
            const resp = await response.json();
            console.log(resp)
            if(response.status === 200){
                setCustomerData(resp.message)

            }
            
        } catch (error) {
            console.log(error)
            
        }
    }



    return (
        <>
            <Layout>
                <CustomerList customerData={customerData}/>

            </Layout>
        </>
    )
}

export default Page