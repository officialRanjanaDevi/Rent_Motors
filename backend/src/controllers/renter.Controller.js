import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/Vehicle.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// vehicle routes for renter

const createVehicle = asyncHandler(async (req, res) => {
  // get vehicle details from req.body
  // check if renter is registered or not
  // access imagePath from req.file an store it in an array
  // upload images from imagePath on cloudinary and store it in array
  // access url of images uploaded on cloudinary
  // create new vehicle listing
  // return response if success
 
  const {
    title,
    brand,
    price,
    description,
    fuel,
    type,
    seater,
    mileage,
    speed,
  } = req.body;
   const user = req.user;
  if (!user) {
    throw new ApiError(409, "Renter not found");
  }

  if (user.type !== "Renter") {
    throw new ApiError(
      409,
      "You are not a renter,unauthorized to create listing"
    );
  }

  const existedVehicle = await Vehicle.findOne({ title: title.toLowerCase() });
  if (existedVehicle) {
    throw new ApiError(409, "Title already exists, Please change the title ");
  }

  const imagePath = req.files.map((file) => file.path);
  if (imagePath.length <= 0) {
    throw new ApiError(400, "Images are required.");
  }

  const images = await Promise.all(
    imagePath.map((image) => uploadOnCloudinary(image))
  );

  const imagesUrl = images.map((image) => image.url);
  if (imagesUrl.length <= 0) {
    throw new ApiError(500, "Some error occured ,please try again");
  }

  const vehicle = await Vehicle.create({
    title: title.toLowerCase(),
    owner: user._id,
    images: imagesUrl,
    brand,
    price,
    description,
    fuel,
    type,
    seater,
    mileage,
    speed,
  });
  const newVehcile = await Vehicle.findById(vehicle._id);
  if (!newVehcile) {
    throw new ApiError(
      500,
      "Failed to create new Vehicle listing ,Please try again"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200,newVehcile, "Vehicle created successfully"));
});

const deleteVehicle = asyncHandler(async (req, res) => {
  // get vehicle id from req.body
  // check if user is authorized to delete the vehicle or not
  // check if vehicle exists or not
  // if exists delete it
  //return success
  const { id } = req.body;
  const user = req.user;

  if (!user) {
    throw new ApiError(409, "User not found");
  }
  if (user.type !== "Renter") {
    throw new ApiError(
      409,
      "You are not a renter,unauthorized to delete listing"
    );
  }
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(409, "Vehicle not found");
  }
  if (vehicle.owner.toString() !== user._id.toString()) {
    return new ApiError(409, "You are not authorized to delete this listing");
  }
  const deletedVehicle = await Vehicle.findByIdAndDelete(id);
  return res
    .status(201)
    .json(new ApiResponse(200, deletedVehicle, "Vehicle deleted successfully"));
});

const updateVehicle = asyncHandler(async (req, res) => {
  // get vehicle details from req.body
  // check if user is authorized to update or not
  // check if vehicle exists or not
  // update data on db
  // return res

  const data = req.body;
  const user = req.user;
  if (!user) {
    throw new ApiError(409, "Renter not found");
  }

  if (user.type !== "Renter") {
    throw new ApiError(
      409,
      "You are not a renter,unauthorized to update listing"
    );
  }

  const existedVehicle = await Vehicle.findById(data.id);
  if (!existedVehicle) {
    throw new ApiError(409, "Vehicle doesnot exist");
  }
  if (existedVehicle.owner.toString() !== user._id.toString()) {
    throw new ApiError(409, "You are not authorized to update this vehicle");
  }

  const duplicateTitle = await Vehicle.findOne({ title: data.title });
  if (duplicateTitle._id.toString()!==data.id) {
    throw new ApiError(400, "Title already exists");
  }

  const vehicle = await Vehicle.findByIdAndUpdate(
    data.id,
    { ...data },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, vehicle, "Vehicle updated successfully"));
});

const updateImages = asyncHandler(async (req, res) => {
  // check if user is authorized to update images or not
  // check if vehicle exists or not
  // check if images are provided or not
  // upload images on cloudinary if exists
  // update imageurl on db
  const { id } = req.body;
  const user = req.user;
  if (!user) {
    throw new ApiError(409, "Renter not found");
  }

  if (user.type !== "Renter") {
    throw new ApiError(
      409,
      "You are not a renter,unauthorized to update listing"
    );
  }

  const existedVehicle = await Vehicle.findById(id);
  if (!existedVehicle) {
    throw new ApiError(409, "Vehicle doesnot exist");
  }
  if (existedVehicle.owner.toString() !== user._id.toString()) {
    throw new ApiError(409, "You are not authorized to update this vehicle");
  }
  console.log(req.files);
  const imagePath = req.files.map((file) => file.path);
  if (imagePath.length <= 0) {
    throw new ApiError(400, "Images are missing,Please Upload images");
  }
  const images = await Promise.all(
    imagePath.map((image) => uploadOnCloudinary(image))
  );
  const imagesUrl = images.map((image) => image.url);

  if (imagesUrl.length <= 0) {
    throw new ApiError(
      500,
      "Some error occurred while uploading images on cloudinary, please try again"
    );
  }
  existedVehicle.images = imagesUrl;
  existedVehicle.save();

  return res
    .status(201)
    .json(new ApiResponse(200, existedVehicle, "Images updated successfully"));
});

const viewVehicleListing = asyncHandler(async (req, res) => {
  // get id of user from req.user
  // check if user is renter or not
  // select all those vehicles whose owner is user
  // return res
  const user = req.user;
  if (user.type !== "Renter") {
    throw new ApiError(400, "You are not a renter.");
  }
  const vehicles = await Vehicle.find({ owner:user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, vehicles, "vehicles are present"));
});

// order routes for renter

const viewOrders=asyncHandler(async(req,res)=>{
  // get user info from req.user
  // check if user is renter or not
  // get status from req.body
  // get orders where renter is user and status of order is ${status}
  // return res

  const user=req.user;
  const {status}=req.body;
  if(user.type==="Renter"){
    throw new ApiError(409,"Unauthorized to access new orders")
  }
  const authorizedStatus = ["Placed", "Delivered", "Accepted", "Cancelled", "Rejected"];
  if (!authorizedStatus.includes(status)) {
    throw new ApiError(409, "Status is not authorized");
  }
  
  const orders=await Orders.find({renter:user._id , status})
  return res.status(200).json(new ApiResponse(200,orders,"Orders are here"))

})

const manageOrders=asyncHandler(async(req,res)=>{
   // get user info from req.user
  // check if user is renter or not
  // get status from req.body and id of order
  // check idf order exists or not
  // check if order is already delivered or rejected or not
  // if not then update orders where renter is user and status of order is ${status}
  // return res

  const user=req.user;
  const {id,status}=req.body;
  if(user.type==="Renter"){
    throw new ApiError(409,"Unauthorized to access orders")
  }

  const order=await Orders.findById(id);
  if(!order){
    throw new ApiError(400,"No such order exists")
  }
  if(order.status==="Delivered"){
    throw new ApiError(400,"Order is already delivered")
  }
  if(order.status==="Rejected"){
    throw new ApiError(400,"Order is already rejected")
  }
  const authorizedStatus = [ "Delivered", "Accepted", "Rejected"];
  if (!authorizedStatus.includes(status)) {
    throw new ApiError(409, "Status is not authorized");
  }
  
  const updatedorder=await Orders.findByIdAndUpdate(id,{status},{new:true})
  return res.status(200).json(new ApiResponse(200,updatedorder,"Orders are updated"))

})

export {
  createVehicle,
  deleteVehicle,
  updateVehicle,
  updateImages,
  viewVehicleListing,
  viewOrders,
  manageOrders
};
