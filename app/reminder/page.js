"use client"

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import { getReminderAmount } from "@helper/http";

const page = () => {

    const [ amount, setAmount ] = useState("");
    
    const searchParams = useSearchParams()
    const custID = searchParams.get('custID')
    const userID = searchParams.get('userID')

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["reminder"],
        queryFn: () => getReminderAmount({custID: custID, userID: userID }),
    });


  return (
    <>
    {data && 
        <div className='text-white'>Your Payment amount is left for : {data[0]?.reminderAmount
        }</div>}
    </>
  )
}

export default page