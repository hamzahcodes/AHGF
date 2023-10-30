'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthContext from '@store/auth-context'
import {


  QueryClientProvider,
} from '@tanstack/react-query'

import { queryClient } from '@helper/http'


const Providers = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState({ status: false, token: '' });
  const loginHandler = (status, token) => {
    console.log(status, token, "&^")
    setIsLoggedIn({ status: status, token: token })
    // localStorage.setItem('token', token)
    // router.replace('/')
  }
  return (
    <QueryClientProvider client={queryClient}>

      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          loginHandler: loginHandler
        }}
      >{children}
      </AuthContext.Provider>

    </QueryClientProvider>

  )
}

export default Providers