import React from 'react'
import { images } from '../../assets/images'
import { useNavigate } from 'react-router-dom'
const Success = () => {
    const navigate =useNavigate();
  return (
    <div className='mt-20 flex flex-col items-center'>
       <img src={images.success} alt="payment success" className='h-[50vh]' />
       <p className='text-sm text-neutral-500 my-2'>Congratulations payment is successfull</p>
       <button className='bg-lime-600 px-3 py-1 rounded-md shadow-md shadow-neutral-700 hover:scale-105 duration-700 text-white ' onClick={()=>navigate("/order")} >View Orders</button>
    </div>
  )
}

export default Success
