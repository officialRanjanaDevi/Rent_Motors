import React from 'react'
import NewOrder from '../NewOrder/NewOrder'
import CancelReq from '../CancelReq/CancelReq'
import Analysis from '../Analysis/Analysis'
import AcceptedOrder from '../AcceptedOrders/AcceptedOrder'
import AddVehicle from '../AddVehicle/AddVehicle'
import UpdateVehcile from '../UpdateVehicle/UpdateVehicle'
const Pannel = (props) => {
    const {panel}=props.panel;
  
    return (
    <div className=' w-full h-full rounded-md px-2 pb-2'>
        {panel==='addVehicle'&&<AddVehicle/>}
        {panel==='updateVehicle'&&<UpdateVehcile/>}
        {panel==='newOrder'&&<NewOrder/>}
        {panel==='acceptedOrder'&&<AcceptedOrder/>}
        {panel==='cancelReq'&&<CancelReq/>}
        {panel==='analysis'&&<Analysis/>}
      
    </div>
  )
}

export default Pannel
