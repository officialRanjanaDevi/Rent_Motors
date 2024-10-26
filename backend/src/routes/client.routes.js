import { Router } from "express";
import { viewListing, viewVehicle ,addReview} from "../controllers/client.Controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/viewListing").get(viewListing);
router.route("/viewVehicle").get(viewVehicle);
router.route("/addReview").post(verifyJWT,addReview);
export default router;
