import React , {useState }from 'react'

const Stats = ({customerData}) => {

    console.log('====================================');
    console.log(customerData,"#5");
    console.log('====================================');
    let recieved =0;
    let total = 0
    
     customerData.map((data) => {
          let recieved_temp = data.financial_details
            .map((record) => record.amount)
            .reduce((total, amount) => total + amount, 0);
            recieved = recieved + recieved_temp

          let total_temp = data.goat_details
            .map((record) => record.total_amount)
            .reduce((total, amount) => total + amount, 0);
            total = total + total_temp;
           
    })
    
    
  return (
      <div className="w-full  stats shadow">

         

          <div className="stat place-items-center w-full py-10">
              <div className="stat-title">Recieved</div>
              <div className="stat-value text-primary text-md">+{recieved }</div>
              <div className="stat-desc text-secondary"></div>

              {/* <div className='text-primary'>text primary</div>
              <div className='text-secondary'>text second</div>
              <div className='text-accent'>text second</div>
              <div className='text-neutral'>text neutral</div> */}
              
          </div>

          <div className="stat place-items-center w-full py-10">
              <div className="stat-title">Due</div>
              <div className="stat-value text-md">{total - recieved}</div>
              <div className="stat-desc"></div>
          </div>

      </div>
  )
}

export default Stats