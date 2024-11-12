import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/Vehicle.model.js";
import { Order } from "../models/Order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ObjectId } from 'mongodb';

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
  if (duplicateTitle&&duplicateTitle._id.toString()!==data.id) {
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
 
  const vehicles = await Vehicle.aggregate([
    {
      $match: { owner: user._id },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "vehicle",
        as: "reviews",
        pipeline: [
          {
            $project: {
              rating: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: "$reviews.rating",
        },
      },
    },
    {
      $project: {
        reviews: 0, 
      },
    },
  ]);
  
    
  return res
    .status(200)
    .json(new ApiResponse(200, vehicles, "vehicles are present"));
});

// order routes for renter
const findOrder=asyncHandler(async(req,res)=>{
  // get user info from req.user
  // check if user is renter or not
  // get id from req.params
  // get all orders where renter is user 
  // return res

  const user=req.user;

  if(user.type!=="Renter"){
    throw new ApiError(409,"Unauthorized to access new orders")
  }
  const {id}=req.params;
 
  const orders = await Order.aggregate([
    {
      $match: {   renter: new ObjectId(user._id), 
        _id: new ObjectId(id) },
    },
    {
      $lookup: {
        from: "vehciles", 
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicleData",
        pipeline: [
          {
            $project: {
              images: 1,
              title: 1,
              brand: 1,
              price: 1,
              mileage:1,
              description:1,
              type:1,
              seater:1
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$vehicleData",
        preserveNullAndEmptyArrays: true, 
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "client",
        foreignField: "_id",
        as: "clientData",
        pipeline: [
          {
            $project: {
              username: 1,
              email: 1,
              address: 1,
              contact: 1,
              city: 1,
              pincode: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$clientData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  if(orders.length===0){
    throw new ApiError(400,"No such order exists");
  }
  return res.status(200).json(new ApiResponse(200,orders[0],"Orders are here"))
})

const viewAllOrders=asyncHandler(async(req,res)=>{
  // get user info from req.user
  // check if user is renter or not
  // get status from req.body
  // get all orders where renter is user 
  // return res

  const user=req.user;

  if(user.type!=="Renter"){
    throw new ApiError(409,"Unauthorized to access new orders")
  }
 
  const orders = await Order.aggregate([
    {
      $match: { renter: user._id },
    },
    {
      $lookup: {
        from: "vehciles",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicleData",
        pipeline: [
          {
            $project: {
              brand: 1, 
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$vehicleData",
      },
    },])
  
  return res.status(200).json(new ApiResponse(200,orders,"Orders are here"))
})


const viewOrders=asyncHandler(async(req,res)=>{
  // get user info from req.user
  // check if user is renter or not
  // get status from req.body
  // get orders where renter is user and status of order is ${status}
  // return res

  const user=req.user;
  const {status}=req.params;
  if(user.type!=="Renter"){
    throw new ApiError(409,"Unauthorized to access new orders")
  }
  const authorizedStatus = ["Placed", "Delivered", "Accepted", "Cancelled", "Rejected","CancelReq"];
  if (!authorizedStatus.includes(status)) {
    throw new ApiError(409, "Status is not authorized");
  }
  const orders = await Order.aggregate([
    {
      $match: { renter: user._id, status },
    },
    {
      $lookup: {
        from: "vehciles",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicleData",
        pipeline: [
          {
            $project: {
              images: 1,
              title: 1,
              brand: 1,
              price:1
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$vehicleData",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "client",
        foreignField: "_id",
        as: "clientData",
        pipeline: [
          {
            $project: {
              username: 1,
              email: 1,
              address: 1,
              contact: 1,
              city: 1,
              pincode: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$clientData",
      },
    },
  ]);
  
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
  if(user.type!=="Renter"){
    throw new ApiError(409,"Unauthorized to access orders")
  }

  const order=await Order.findById(id);
  if(!order){
    throw new ApiError(400,"No such order exists")
  }
  if(order.status==="Delivered"){
    throw new ApiError(400,"Order is already delivered")
  }
  if(order.status==="Rejected"){
    throw new ApiError(400,"Order is already rejected")
  }
  const authorizedStatus = [ "Delivered", "Accepted", "Rejected","Cancelled"];
  if (!authorizedStatus.includes(status)) {
    throw new ApiError(409, "Status is not authorized");
  }
  
  const updatedorder=await Order.findByIdAndUpdate(id,{status},{new:true})
  return res.status(200).json(new ApiResponse(200,updatedorder,"Orders are updated"))

})

export {
  createVehicle,
  deleteVehicle,
  updateVehicle,
  updateImages,
  viewVehicleListing,
  viewOrders,
  viewAllOrders,
  manageOrders,
  findOrder
};
