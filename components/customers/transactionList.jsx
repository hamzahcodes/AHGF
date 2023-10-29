import React from 'react'

const TransactionList = ({data}) => {
  return (
    <>
          <div  >
              <div className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>


                  <div className='w-[80%] flex justify-between'>
                      <h2 className='min-w-[30%]'>Payout Date</h2>

                      <h3 className=''>Amount</h3>

                  </div>


              </div>

          </div>
    
    {
        data?.map((data,key)=> (
            <div key={key} >
                <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>
                    

                    <div className='w-[80%] flex justify-between'>
                    
                        <h2 className='min-w-[30%]'>{new Date(data.pay_date).toLocaleDateString().toString()}</h2>

                        <h3 className='text-[seagreen]'>{data.amount}</h3>

                    </div>


                </div>

            </div>

        ))
    }
        

    </>
    
  )
}

export default TransactionList