import mongoose from "mongoose";

const vehicleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    brand:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    images:[
        {
            type:String,
        }
    ],
    description:{
        type:String,
        required:true,
    },
    fuel:{
        type:String,
        enum: ['Petrol','Electricity'],
        required:true,
    },
    type:{
        type:String,
        enum: ['Scooter','Crusier','Off-Road','Touring','Sports Bike','Standard'],
        required:true,
    },
    seater:{
        type:String,
        enum: ['One-seater','Two-seater'],
        required:true,
    },
    mileage:{
        type:Number,
        required:true
    },
    speed:{
        type:Number,
        required:true
    }, 
    isavailable:{
        type:Boolean,
        default:true,
        required:true,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},{timestamps:true});

export const Vehicle= mongoose.model('Vehcile',vehicleSchema);