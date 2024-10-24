import {Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { createVehicle } from "../controllers/client.Controller.js";
import { validateVehicle } from "../middlewares/vehicle.middleware.js";
const router =Router ()

router.route("/createVehicle").post(validateVehicle,upload.array("images",3),createVehicle)

export default router