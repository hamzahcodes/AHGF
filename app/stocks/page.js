'use client'

import Layout from '@components/ParentDrawer/Layout'
import React,{ useContext} from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllStocks } from '@helper/http'
import AuthContext from '@store/auth-context'
import StockList from '@components/stocks/stockList'
import LoadingSpinner from '@components/ui/loadingSpinner'
const Page = () => {

    const context = useContext(AuthContext);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getAllStocks()
    })
   


   

  return (
    <>
        <Layout>
        {
            data? (
                      <StockList stockData={data} />


            ) :
            (
                <LoadingSpinner />
            )
        }
        
       
        </Layout>
    </>
  )
}

export default Page