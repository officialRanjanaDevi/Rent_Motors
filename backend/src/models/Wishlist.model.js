import mongoose from "mongoose"


const wishlistSchema= new mongoose.Schema({
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
},{timestamps:true})

export const Wishlist = mongoose.model('Wishlist',wishlistSchema)