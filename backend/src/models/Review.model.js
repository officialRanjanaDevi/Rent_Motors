import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema ({
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
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        required:true
    }
},{timestamps:true});

export const Review =mongoose.model('Review',reviewSchema)