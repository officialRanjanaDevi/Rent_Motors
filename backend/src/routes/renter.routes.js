import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { validateVehicle } from "../middlewares/vehicle.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateImages,
  viewVehicleListing,
  viewOrders,
  manageOrders
} from "../controllers/renter.Controller.js";

const router = Router();

router.route("/vehicle")
  .post(validateVehicle, verifyJWT, upload.array("images", 3), createVehicle)
  .patch(verifyJWT, updateVehicle)
  .delete(verifyJWT, deleteVehicle)
  .get(verifyJWT, viewVehicleListing);

router.route("/updateImages")
  .patch(verifyJWT,upload.array("images", 3), updateImages);

router.route("/order")
  .get(verifyJWT,viewOrders)  
  .patch(verifyJWT,manageOrders)


export default router;
