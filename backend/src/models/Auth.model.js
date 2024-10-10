import mongoose from "mongoose";


const authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Password length must be at least 6 characters'],
    },
    type:{
        type:String,
        enum: ['Renter','Client','Admin'],
        required:true,
    },
    address:{
        type:String,
    },
    contact:{
        type:Number,
        minlength: [10, 'Invalid contact number'],
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    pincode:{
        type:String
    }
},{timestamps:true})


export const Auth= mongoose.model('Auth',authSchema);