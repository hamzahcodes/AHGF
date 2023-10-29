'use client'
import React , {useEffect , useState , useContext} from 'react'
import Layout from '@components/ParentDrawer/Layout'
import CustomerList from '@components/customers/customerList'
import AuthContext from '@store/auth-context'
import Link from 'next/link'
import AddCustomerDialog from '@components/customers/addCustomerDialog'
const Page = () => {
    const [customerData, setCustomerData] = useState(null);
    const context = useContext(AuthContext);
   

    useEffect(() => {
        console.log(context,"@@")
       context.isLoggedIn.status &&  getAllCustomers()
    }, [context.isLoggedIn]);


    const getAllCustomers =async () =>{
        try {
            const response = await fetch(`/api/customers`)
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
              

              
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className='text-5xl fixed bottom-[3%] right-[5%] w-[80px] h-[80px] rounded-full bg-[crimson] text-[#fff]'>+</button>

                <AddCustomerDialog/>

              
                
            </Layout>
        </>
    )
}

export default Page