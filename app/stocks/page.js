'use client'

import Layout from '@components/ParentDrawer/Layout'
import React,{ useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllStocks } from '@helper/http'
import AuthContext from '@store/auth-context'
import StockList from '@components/stocks/stockList'
import LoadingSpinner from '@components/ui/loadingSpinner'
import StockPdf from '@components/stocks/StockPdf'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'

const Page = () => {

    const context = useContext(AuthContext);
    const [isClient, setIsClient] = useState(false)

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getAllStocks()
    })
   

    useEffect(() => {
        setIsClient(true)
      }, [])
   

  return (
    <>
        <Layout>
      <div className='flex justify-center items-center py-7'>
      {isClient && (
          <PDFDownloadLink
            className='bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw]'
            document={
              <StockPdf
                stockData={data}
              />
            }
            fileName={`ahgf_stock_details.pdf`}
          >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Stock Details"
              }
          </PDFDownloadLink>
          )}
        </div>  
        {
            data? ( <StockList stockData={data} />) : (<LoadingSpinner />)
        }
        </Layout>
    </>
  )
}

export default Page