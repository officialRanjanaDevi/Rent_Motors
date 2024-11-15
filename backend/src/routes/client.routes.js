import { Router } from "express";
import {
  viewListing,
  viewVehicle,
  viewReview,
  addReview,
  deleteReview,
  addToWishlist,
  removeFromWishlist,
  viewWishlist,
  addToCart,
  viewCart,
  removeFromCart,
  placeOrder,
  viewOrder,
  cancelOrder,
  makePayment
} from "../controllers/client.Controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/viewListing").get(viewListing);
router.route("/viewVehicle/:id").get(viewVehicle);

router.route("/review").get(viewReview);
router.route("/review").post(verifyJWT, addReview);
router.route("/review").delete(verifyJWT, deleteReview);

router.route("/wishlist").post(verifyJWT, addToWishlist);
router.route("/wishlist").delete(verifyJWT, removeFromWishlist);
router.route("/wishlist").get(verifyJWT, viewWishlist);

router.route("/cart").post(verifyJWT, addToCart);
router.route("/cart").get(verifyJWT, viewCart);
router.route("/cart").delete(verifyJWT, removeFromCart);

router.route("/order").post(verifyJWT, placeOrder);
router.route("/order").get(verifyJWT, viewOrder);
router.route("/order").patch(verifyJWT, cancelOrder);

router.route("/create-checkout-session").post(verifyJWT,makePayment)
export default router;
