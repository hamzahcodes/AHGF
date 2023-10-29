'use client'
import React , {useState} from 'react'
import Layout from '@components/ParentDrawer/Layout'
const AddCustomer = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
  
    "first_name": "",
    "last_name": "",
    "email": "",
    "mobile_number": "",
   
  });

  const handleChange = (e) => {
    let value = e.target.value
    let ele = document.getElementsByName(e.target.name)[0].parentNode;
    let errorText = ele.querySelector('.error-text')
    if (value !== '' && errorText) {
      errorText && ele.removeChild(errorText)
    }
    setData({
      ...data,
      [e.target.name]: value
    });
  }
  return (
    <Layout>
      <h1>ggyku</h1>

    </Layout>
    
  )
}

export default AddCustomer