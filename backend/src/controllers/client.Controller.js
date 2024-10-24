import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {Vehicle} from "../models/Vehicle.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/User.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const createVehicle = asyncHandler( async(req,res)=>{
    // get vehicle details from req.body
    // check if renter is registered or not 
    // access imagePath from req.file an store it in an array
    // upload images from imagePath on cloudinary and store it in array
    // access url of images uploaded on cloudinary
    // create new vehicle listing 
    // return response if success 

    const {owner,title,brand,price,description,fuel,type,seater,mileage,speed} =req.body
    const existedUser =await  User.findById(owner)
    if(!existedUser){
        throw new ApiError(409,"Renter not found")
    }

    if(existedUser.type!=="Renter"){
        throw new ApiError(409,"You are not a renter,unauthorized to create listing")
    }

    const existedVehicle =await Vehicle.findOne({title:title.toLowerCase()})
    if(existedVehicle){
        throw new ApiError(409,"Title already exists, Please change the title ")
    }
     
    
    const imagePath = req.files.map(file => file.path);
    if(imagePath.length<=0){
        throw new ApiError(400,"Images are required.")
    }

    const images = await Promise.all(imagePath.map(image => uploadOnCloudinary(image)));

    const imagesUrl = images.map(image => image.url);
    if(imagesUrl.length<=0){
        throw new ApiError(500,"Some error occured ,please try again")
    }
    

    const vehicle = await Vehicle.create({title:title.toLowerCase(),owner,images:imagesUrl,brand,price,description,fuel,type,seater,mileage,speed})
    const newVehcile=await Vehicle.findById(vehicle._id)
    if(!newVehcile){
        throw new ApiError(500,"Failed to create new Vehicle listing ,Please try again")
    }

    return res.status(201).json(
        new ApiResponse(200,existedUser,"Vehicle created successfully")
    )
})

export {createVehicle}