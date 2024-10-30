import React from 'react'
import CancelItem from './CancelItem'

const CancelReq = () => {
  return (
    <div className='h-full'>
      <h2 className='text-xl font-bold text-center'>New Cancel Requests</h2>
      <div className='sm:overflow-auto sm:h-[95%]'>
      {Array.from({ length: 8 }).map((_, index) => <CancelItem key={index} />)}
      </div>
      
    </div>
  )
}

export default CancelReq
