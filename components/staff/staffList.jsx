import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import EditStaffDialog from './editStaffDialog';
const StaffList = ({ staffData }) => {
    const [staffID, setStaffID] = useState('');
    console.log('====================================');
    console.log(staffData);
    console.log('====================================');

    return (
        <div className='flex w-full flex-col'>
            <div  className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>
                

                <div className='w-[80%] flex justify-between'>
                    <h2 className='min-w-[30%]'>Staff Member</h2>
                    <h3 className=''>Contact</h3>

                    <h3 className=''>Salary</h3>

                </div>


            </div>
        

            {staffData?.map((data, key) => {
                {/* let paid = data.financial_details.map(record => record.amount).reduce((total, amount) => total + amount, 0);
                let total = data.goat_details.map(record => record.total_amount).reduce((total, amount) => total + amount, 0); */}

                return (
                    <div key={key} onClick={() => {setStaffID(data._id) ;document.getElementById('edit_staff_dialog').showModal()}}>
                        <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>
                            <div className={`bg-[#37D39A] sm:w-[60px] w-[40px] h-[40px] sm:h-[60px] rounded-[100%] flex justify-center items-center text-white sm:text-[2.4rem] `}>
                                {data.name?.[0]}
                            </div>

                            <div className='w-[80%] flex justify-between'>
                                <h2 className='min-w-[30%]'>{data.name}</h2>
                                <h3 className='text-[seagreen]'>{data.phone}</h3>
                                
                                <h3 className='text-[seagreen]'>+₹{data.salary}</h3>
                                
                            </div>


                        </div>

                    </div>

                )
         })}

         <EditStaffDialog id={staffID} />

        </div>
    )
}

export default StaffList