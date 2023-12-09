'use client'

import React, { useState } from 'react'
import {
  QueryClientProvider,
} from '@tanstack/react-query'

import { queryClient } from '@helper/http'

import { SessionProvider } from "next-auth/react"


const Providers = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>

      <SessionProvider>{children}</SessionProvider>

    </QueryClientProvider>

  )
}

export default Providers