import {Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { createVehicle, updateVehicle ,deleteVehicle, updateImages , viewVehicleListing} from "../controllers/renter.Controller.js";
import { validateVehicle } from "../middlewares/vehicle.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router =Router ()

router.route("/createVehicle").post(validateVehicle,verifyJWT,upload.array("images",3),createVehicle)

router.route("/updateVehicle").patch(verifyJWT,updateVehicle)

router.route("/deleteVehicle").delete(verifyJWT,deleteVehicle)

router.route("/updateImages").patch(verifyJWT,upload.array("images",3),updateImages)

router.route("/viewVehicle").get(verifyJWT,viewVehicleListing)

export default router