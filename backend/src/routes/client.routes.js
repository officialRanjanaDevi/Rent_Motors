import {Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { createVehicle, updateVehicle } from "../controllers/client.Controller.js";
import { validateVehicle } from "../middlewares/vehicle.middleware.js";
const router =Router ()

router.route("/createVehicle").post(validateVehicle,upload.array("images",3),createVehicle)

router.route("/updateVehicle").patch(upload.array("images",3),updateVehicle)

export default router