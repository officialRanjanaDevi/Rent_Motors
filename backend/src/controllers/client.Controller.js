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


const deleteVehicle =asyncHandler(async(req,res)=>{

})

const updateVehicle=asyncHandler(async(req,res)=>{
      // get vehicle details from req.body
      // check if user is authorized to update or not 
      // check if vehicle exists or not 
      // upload images on cloudinary if exists
      // update data on db
      // return res

      const data=req.body;
      console.log(data);
      const existedUser =await  User.findById(data.owner)
      if(!existedUser){
          throw new ApiError(409,"Renter not found")
      }
  
      if(existedUser.type!=="Renter"){
          throw new ApiError(409,"You are not a renter,unauthorized to update listing")
      }

      const existedVehicle =await Vehicle.findById(data.id)
      if(!existedVehicle){
        throw new ApiError(409,"Vehicle doesnot exist")
      }

      if(existedVehicle.owner.toString()!==existedUser._id){
        throw new ApiError(409,"You are not authorized to update this vehicle")
      }

      const duplicateTitle= await Vehicle.findOne({title:data.title})
      if(!duplicateTitle){
        throw new ApiError(400,"Title already exists")
      }
      
      let imagesUrl = [];
      const imagePath = req.files ? req.files.map(file => file.path) : [];
      if (imagePath.length > 0) {
        const images = await Promise.all(imagePath.map(image => uploadOnCloudinary(image)));
        imagesUrl = images.map(image => image.url);
    
        if (imagesUrl.length <= 0) {
          throw new ApiError(500, "Some error occurred, please try again");
        }
        data.images = imagesUrl;
      }
    
    const vehicle =await Vehicle.findByIdAndUpdate(data.id,{...data},{new:true})

    

      return res.status(201).json(
        new ApiResponse(200,vehicle,"Vehicle updated successfully")
    )
})

export {createVehicle,deleteVehicle,updateVehicle}