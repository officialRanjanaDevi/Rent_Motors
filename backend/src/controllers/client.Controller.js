import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/Vehicle.model.js";
import {Wishlist} from "../models/Wishlist.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/Review.model.js";
import { MongoCryptInvalidArgumentError, ObjectId } from "mongodb";

const viewListing = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({});
    if (!vehicles) {
        throw new ApiError(500, "Failed to load Vehicles");
    }
    return res.status(200).json(new ApiResponse(200, vehicles, "Vehicles are here"));
});

const viewVehicle = asyncHandler(async (req, res) => {
    // get id from req.body
    // find vehicle through id
    //return res
    console.log(req.body);
    const {id} = req.body; 
    if(!id){
        throw new ApiError(400,"please provide vehicle id")
    }
 
    const vehicle = await Vehicle.aggregate([
        {
            $match: { _id: new ObjectId(id) }  
        },
        {
            $lookup:{
                from:"reviews",
                localField:"_id",
                foreignField:"vehicle",
                as:"review",
                pipeline:[{
                    $project:{
                        comment:1,
                        rating:1
                    }
                }]
            }
        }
    ]);
    
    if (!vehicle) {
        throw new ApiError(400, "No such vehicle exists");
    }
    return res.status(200).json(new ApiResponse(200, vehicle[0], "Vehicle found")); 
});


const addReview =asyncHandler(async(req,res)=>{
    //check if user is client or not
    //check if vehicle exists or not
    //get review from req.body
    //add it in review model
    //return res

    const user=req.user
    if(user.type!=="Client"){
        throw new ApiError(409,"You are not a client")
    }
    const {id,comment,rating}=req.body
    console.log(req.body)
    const vehicle =await Vehicle.findById(id)
    if(!vehicle){
        throw new ApiError(409,"No such vehicle exists")
    }
    if(!rating){
        throw new ApiError(409,"Please add rating")
    }
    const review=await Review.create({client:user._id, vehicle:vehicle._id,comment,rating})
     if(!review){
        throw new ApiError(500,"Some error occurred while adding review, please try again")
     }
    return res.status(200).json(new ApiResponse(200,review,"Review created"))
})


const deleteReview=asyncHandler(async(req,res)=>{
    // get user details and review id from req.user and req.body
     // check if review exists or not
    // check if user is owner of review or not 
    // delete review from db
    // return res
    const user=req.user
     const {id}=req.body
     if(user.type!=="Client"){
        throw new ApiError(409,"You are not authorized to delete the review")
     }
     const review=await Review.findById(id)
     if(!review){
        throw new ApiError(409,"No such review exists")
     }

     if(review.client.toString()!==user._id.toString()){
        throw new ApiError(409,"You are not authorized to delete this review")
     }

     const deletedReview = await Review.findByIdAndDelete(id)
     if(!deletedReview){
        throw new ApiError(500,"Some error occurred while deleting the review, please try again")
     }
     res.status(200).json( new ApiResponse(200,deletedReview,"Review deleted successfully"))
})


const addToWishlist =asyncHandler(async(req,res)=>{
    // extract user id from req.user
    // check if user is client or not
    // check if vehicle exists or not
    // check if vehicle is already present in client's wishlist or not
    // add in wishlist db
    // return res

    const user=req.user
    const {id}=req.body
  
    if(user.type!=="Client"){
      throw new ApiError(409,"You are unauthorized to add in wishlist.")
    }

    const vehicle = await Vehicle.findById(id)
    if(!vehicle){
        throw new ApiError(409,"No such vehicle exists")
    }

    const existedWish =await Wishlist.find({client:user._id, vehicle:vehicle._id})
    if(existedWish){
      return res.status(200).json(new ApiResponse(200,existedWish,"Vehicle already exists in your wishlist"))
    }

    const wish=await Wishlist.create({client:user._id,vehicle:vehicle._id})
    if(!wish){
        throw new ApiError(500,"Failed to add in Wishlist, please try again")
    }
    return res.status(200).json(new ApiResponse(200,wish,"Vehicle added in your wishlist"))
})


const removeFromWishlist=asyncHandler(async(req,res)=>{
    // get user details from req.user
    //check if user is client or not
    // get vehicle id from req.body
    // check if vehicle exists or not
    // check if vehicle is present in users wishlist or not
    // delete wishlist
    // return res
    
    const user=req.user
    if(user.type!=="Client"){
       throw new ApiError(409,"You are not a client ")
    }
    const {id}= req.body
    const vehicle=await Vehicle.findById(id)
    if(!vehicle){
        throw new ApiError(409,"No such vehicle exists")
    }
 
    const wish=await Wishlist.findOne({client:user._id, vehicle:vehicle._id})
    if(!wish){
        throw new ApiError(409,"Vehicle doesnot exists in your wishlist")
    }
   
    const deletedWish=await Wishlist.findByIdAndDelete(wish._id)
    if(!deletedWish){
        throw new ApiError(500,"Failed to remove vehicle from wishlist")
    }
    return res.status(200).json(new ApiResponse(200,deletedWish,"Vehicle removed successfully"))
})

const viewWishlist=asyncHandler(async(req,res)=>{

})


export { viewListing, viewVehicle, addReview ,deleteReview, addToWishlist, removeFromWishlist, viewWishlist};
