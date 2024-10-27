import mongoose from "mongoose"

const orderSchema= new mongoose.Schema({
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    renter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum: ['Delivered','Placed','Accepted','Cancelled','Rejected'],
        default:"Placed",
    }

},{timestamps:true})


export const Order =mongoose.model('Order',orderSchema)