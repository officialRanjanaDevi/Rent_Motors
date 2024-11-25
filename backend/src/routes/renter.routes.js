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
  viewAllOrders,
  manageOrders,
  findOrder
} from "../controllers/renter.Controller.js";

const router = Router();

router.route("/vehicle/:userid")
  .post(verifyJWT,upload.array("images", 3),validateVehicle,  createVehicle)
  .patch(verifyJWT, updateVehicle)
  .delete(verifyJWT, deleteVehicle)
  .get(verifyJWT, viewVehicleListing);

router.route("/updateImages/:userid")
  .patch(verifyJWT,upload.array("images", 3), updateImages);


router.route("/order/:userid")  
  .patch(verifyJWT,manageOrders)
  .get(verifyJWT,viewAllOrders);

router.route("/order/:status/:userid")
  .get(verifyJWT,viewOrders)  
router.route("/viewOrder/:id/:userid")
  .get(verifyJWT,findOrder)    

export default router;
