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
router.route("/review/:userid").post(verifyJWT, addReview);
router.route("/review/:userid").delete(verifyJWT, deleteReview);

router.route("/wishlist/:userid").post(verifyJWT, addToWishlist);
router.route("/wishlist/:userid").delete(verifyJWT, removeFromWishlist);
router.route("/wishlist/:userid").get(verifyJWT, viewWishlist);

router.route("/cart/:userid").post(verifyJWT, addToCart);
router.route("/cart/:userid").get(verifyJWT, viewCart);
router.route("/cart/:userid").delete(verifyJWT, removeFromCart);

router.route("/order/:userid").post(verifyJWT, placeOrder);
router.route("/order/:userid").get(verifyJWT, viewOrder);
router.route("/order/:userid").patch(verifyJWT, cancelOrder);

router.route("/create-checkout-session/:userid").post(verifyJWT,makePayment)
export default router;
