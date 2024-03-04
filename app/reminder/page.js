"use client"

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import { getReminderAmount } from "@helper/http";

const page = () => {
    
    const searchParams = useSearchParams()
    const custID = searchParams.get('custID')
    const userID = searchParams.get('userID')
    console.log(custID, " ", userID);
    console.log("inside reminder page");
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["reminder"],
        queryFn: () => getReminderAmount({custID: custID, userID: userID }),
    });

    console.log(data);

  return (
    <div className='text-center'>
      <div className='text-gray-900 text-3xl font-medium'>Payment Reminder for</div>
      {data && 
        <div className='text-red-600 text-3xl my-4 font-medium'>{"₹ " + data[0]?.reminderAmount}</div> 
      }<div className='text-gray-900 text-2xl font-normal'>Sent by Al-Hadi Goat Farm</div>
        <div className='text-gray-900 text-xl my-2 font-light	'>Sajid Mulla | 8850284856</div>
    </div>
  )
}

export default page