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
} from "../controllers/renter.Controller.js";

const router = Router();

router
  .route("/vehicle")
  .post(validateVehicle, verifyJWT, upload.array("images", 3), createVehicle);
router.route("/vehicle").patch(verifyJWT, updateVehicle);
router.route("/vehicle").delete(verifyJWT, deleteVehicle);
router.route("/vehicle").get(verifyJWT, viewVehicleListing);

router
  .route("/updateImages")
  .patch(verifyJWT, upload.array("images", 3), updateImages);

export default router;
