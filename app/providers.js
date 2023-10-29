'use client'

import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import AuthContext from '@store/auth-context'
const Providers = ({children}) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState({ status: false, token: '' });
    const loginHandler = (status, token) => {
        console.log(status,token,"&^")
        setIsLoggedIn({ status: status, token: token })
        // localStorage.setItem('token', token)
        // router.replace('/')
    }
  return (
    <AuthContext.Provider
    value={{
        isLoggedIn: isLoggedIn,
        loginHandler:loginHandler
    }}
    >{children}
    </AuthContext.Provider>
  )
}

export default Providers