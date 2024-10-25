import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/Vehicle.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const viewListing = asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({});
    if (!vehicles) {
        throw new ApiError(500, "Failed to load Vehicles");
    }
    return res.status(200).json(new ApiResponse(200, vehicles, "Vehicles are here"));
});

const viewVehicle = asyncHandler(async (req, res) => {
    const {id} = req.body; 
    console.log(req.body);
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
        throw new ApiError(400, "No such vehicle exists");
    }
    return res.status(200).json(new ApiResponse(200, vehicle, "Vehicle found")); 
});

export { viewListing, viewVehicle };
