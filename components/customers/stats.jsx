import React from 'react'

const Stats = () => {
  return (
      <div className="w-full stats shadow">

         

          <div className="stat place-items-center w-full py-10">
              <div className="stat-title">Recieved</div>
              <div className="stat-value text-secondary text-md">+4,200</div>
              <div className="stat-desc text-secondary"></div>
          </div>

          <div className="stat place-items-center w-full py-10">
              <div className="stat-title">Due</div>
              <div className="stat-value text-md">1,200</div>
              <div className="stat-desc"></div>
          </div>

      </div>
  )
}

export default Stats