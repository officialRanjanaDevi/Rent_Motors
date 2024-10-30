import React from 'react'
import Navbar from '../../components/renter/Navbar/Navbar'
import SideBar from '../../components/renter/SideBar/SideBar'
import Pannel from '../../components/renter/Pannel/Pannel'
const Dashboard = (panel) => {
  return (
    <div className='h-screen flex flex-col justify-end'>
      <Navbar/>
      <div className=' flex h-full pt-16 '>
       <SideBar />  
       <Pannel panel={panel}/>  
      </div>
    </div>
  )
}

export default Dashboard
