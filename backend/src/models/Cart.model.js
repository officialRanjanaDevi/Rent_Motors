import mongoose from "mongoose"

const cartSchema=new mongoose.Schema({
    
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       },
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true
       },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }   


},{timestamps:true})

export const Cart = mongoose.model('Cart',cartSchema)