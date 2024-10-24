import {Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { createVehicle, updateVehicle ,deleteVehicle} from "../controllers/client.Controller.js";
import { validateVehicle } from "../middlewares/vehicle.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router =Router ()

router.route("/createVehicle").post(validateVehicle,verifyJWT,upload.array("images",3),createVehicle)

router.route("/updateVehicle").patch(verifyJWT,upload.array("images",3),updateVehicle)

router.route("/deleteVehicle").delete(verifyJWT,deleteVehicle)
export default router