'use client'
import React , {useEffect , useState} from 'react'
import Layout from '@components/layout'
import CustomerList from '@components/customers/customerList'
import { useSession } from 'next-auth/react'


const Page = () => {
    const [customerData, setCustomerData] = useState(null);

    const { data: session } = useSession()
    console.log(session, "in page.js of customers");
    
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