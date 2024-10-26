import { Router } from "express";
import { viewListing, viewVehicle ,addReview,deleteReview, addToWishlist,removeFromWishlist} from "../controllers/client.Controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/viewListing").get(viewListing);

router.route("/viewVehicle").get(viewVehicle);

router.route("/addReview").post(verifyJWT,addReview);

router.route("/deleteReview").delete(verifyJWT,deleteReview);

router.route("/addWishlist").post(verifyJWT,addToWishlist);

router.route("/removeFromWishlist").delete(verifyJWT,removeFromWishlist);

export default router;
