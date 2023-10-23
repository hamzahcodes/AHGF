import React from 'react'

const CustomerHero = ({ customerData }) => {
    return (
        <>
            {customerData && (

                <div class="rounded-xl   bg-gradient-to-r from-[#659999] to-[#f4791f] flex justify-between px-2">
                    <div className='  w-[45%] flex items-center justify-center gap-4 py-4 '>
                        <div className={`bg-[gray]  sm:w-[60px] w-[40px] h-[40px] sm:h-[60px] rounded-[100%] flex justify-center items-center text-white sm:text-[2.4rem] `}>
                            {customerData.basic_details.username[0]}
                        </div>

                        <div className=' flex justify-between flex-col'>
                            <h2>{customerData.basic_details.username}</h2>

                            <p className='text-[12px]'>{customerData.basic_details.phone_no}</p>
                        </div>
                    </div>


                    <div className='flex w-[40%] justify-between items-center flex-col py-8 font-mono'>
                        <div className='w-full text-[12px]  items-baseline flex justify-between'>
                            <span> <span className='text-[crimson] text-[14px]'>•</span> Paid</span>
                            <span className='text-[16px]'>343343</span>

                        </div>

                        <div className='w-full text-[12px]  items-baseline flex justify-between'>
                            <span> <span className='text-[mediumseagreen] text-[14px]'>•</span> Recieved</span>
                            <span className='text-[16px]'>343343</span>

                        </div>

                        <div className='w-full text-[12px]  items-baseline flex justify-between'>
                            <span><span className='text-[gray] text-[14px]'>•</span> Balance</span>
                            <span className='text-[16px]'>343343</span>

                        </div>

                    </div>




                </div>

            )}

        </>
        
     
    )
}

export default CustomerHero