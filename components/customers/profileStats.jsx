import React from 'react'

const ProfileStats = ({supplierData , total , recieved}) => {
    console.log(total)

   
  return (
    <>
        {supplierData ? (
              <div className="stats shadow flex flex-col">
                  <div className="stat">
                      <div className="stat-figure text-secondary">
                          <div className="avatar online">
                              <div className="w-16 rounded-full">
                                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />

                              </div>

                          </div>

                          <div className="stat-title text-primary">{supplierData.supplierName}</div>
                          <div className="stat-title">{supplierData.supplierPhone}</div>
                      </div>
                      <div className="stat-value">₹{total - recieved}</div>
                      <div className="stat-title">↑Due Amount</div>
                    
                      <div className="stat-value text-secondary text-sm">+  ₹{recieved} <br/> Amount paid</div>
                      
                      <div className="stat-value text-primary text-sm">₹{total} <br />Net Payable</div>
                     
                    
                  </div>

                 

              



              </div>
            
    
        ):(
            <h2>loading</h2>

        )}

    </>
    
  )
}

export default ProfileStats