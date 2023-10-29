import React from 'react'

const GoatList = ({data}) => {
  return (
      <>
          <div  >
              <div className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>


                  <div className='w-[80%] flex justify-between'>
                      <h3 className='min-w-[30%]'>Goat Type</h3>

                      <h3 className=''>Palaai</h3>
                      <h3 className=''>Amount</h3>

                  </div>


              </div>

          </div>

          {
              data?.map((data, key) => (
                  <div key={key} >
                      <div key={data._id} className='w-full flex items-center justify-around py-4 border-b-[0.1px] border-[gray]'>


                          <div className='w-[80%] flex justify-between'>

                              <h2 className='min-w-[30%]'>{data.goat_type}</h2>

                              <h3 className=''>{data.palaai_type}</h3>
                              <h3 className=''>{data.total_amount}</h3>

                          </div>


                      </div>

                  </div>

              ))
          }


      </>
  )
}

export default GoatList