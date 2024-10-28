import React from 'react'
import NewOrder from '../NewOrder/NewOrder'
import CancelReq from '../CancelReq/CancelReq'
import AddProduct from '../AddProduct/AddProduct'
import UpdateProduct from '../UpdateProduct/UpdateProduct'
import Analysis from '../Analysis/Analysis'
import AcceptedOrder from '../AcceptedOrders/AcceptedOrder'
const Pannel = (props) => {
    const {panel}=props.panel;
    console.log(panel)
    return (
    <div className=' w-full h-full rounded-md px-2 pb-2'>
        {panel==='addProduct'&&<AddProduct/>}
        {panel==='updateProduct'&&<UpdateProduct/>}
        {panel==='newOrder'&&<NewOrder/>}
        {panel==='acceptedOrder'&&<AcceptedOrder/>}
        {panel==='cancelReq'&&<CancelReq/>}
        {panel==='analysis'&&<Analysis/>}
      
    </div>
  )
}

export default Pannel
