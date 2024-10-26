import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/Vehicle.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/Review.model.js";


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
 
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
        throw new ApiError(400, "No such vehicle exists");
    }
    return res.status(200).json(new ApiResponse(200, vehicle, "Vehicle found")); 
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
    const {id,content,rating}=req.body
    console.log(req.body)
    const vehicle =await Vehicle.findById(id)
    if(!vehicle){
        throw new ApiError(409,"No such vehicle exists")
    }
    if(!rating){
        throw new ApiError(409,"Please add rating")
    }
    const review=await Review.create({client:user._id, vehicle:vehicle._id,content,rating})
     
    return res.status(200).json(new ApiResponse(200,review,"Review created"))
})


export { viewListing, viewVehicle, addReview };
