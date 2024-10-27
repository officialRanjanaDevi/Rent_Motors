import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Vehicle } from "../models/Vehicle.model.js";
import { Wishlist } from "../models/Wishlist.model.js";
import { Order } from "../models/Order.model.js";
import { Cart } from "../models/Cart.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/Review.model.js";
import { ObjectId } from "mongodb";

// Vehicle controllers from client side

const viewListing = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({});
  if (!vehicles) {
    throw new ApiError(500, "Failed to load Vehicles");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, vehicles, "Vehicles are here"));
});

const viewVehicle = asyncHandler(async (req, res) => {
  // get id from req.body
  // find vehicle through id
  //return res
  console.log(req.body);
  const { id } = req.body;
  if (!id) {
    throw new ApiError(400, "please provide vehicle id");
  }

  const vehicle = await Vehicle.aggregate([
    {
      $match: { _id: new ObjectId(id) },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "vehicle",
        as: "review",
        pipeline: [
          {
            $project: {
              comment: 1,
              rating: 1,
            },
          },
        ],
      },
    },
  ]);

  if (!vehicle) {
    throw new ApiError(400, "No such vehicle exists");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, vehicle[0], "Vehicle found"));
});

// review controllers from client side

const addReview = asyncHandler(async (req, res) => {
  //check if user is client or not
  //check if vehicle exists or not
  //get review from req.body
  //add it in review model
  //return res

  const user = req.user;
  if (user.type !== "Client") {
    throw new ApiError(401, "You are not a client");
  }
  const { id, comment, rating } = req.body;
  console.log(req.body);
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(401, "No such vehicle exists");
  }
  if (!rating) {
    throw new ApiError(401, "Please add rating");
  }
  const review = await Review.create({
    client: user._id,
    vehicle: vehicle._id,
    comment,
    rating,
  });
  if (!review) {
    throw new ApiError(
      500,
      "Some error occurred while adding review, please try again"
    );
  }
  return res.status(201).json(new ApiResponse(201, review, "Review created"));
});

const deleteReview = asyncHandler(async (req, res) => {
  // get user details and review id from req.user and req.body
  // check if review exists or not
  // check if user is owner of review or not
  // delete review from db
  // return res
  const user = req.user;
  const { id } = req.body;
  if (user.type !== "Client") {
    throw new ApiError(401, "You are not authorized to delete the review");
  }
  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(401, "No such review exists");
  }

  if (review.client.toString() !== user._id.toString()) {
    throw new ApiError(401, "You are not authorized to delete this review");
  }

  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) {
    throw new ApiError(
      500,
      "Some error occurred while deleting the review, please try again"
    );
  }
  res
    .status(200)
    .json(new ApiResponse(200, deletedReview, "Review deleted successfully"));
});

// wishlist controllers from client side

const addToWishlist = asyncHandler(async (req, res) => {
  // extract user id from req.user
  // check if user is client or not
  // check if vehicle exists or not
  // check if vehicle is already present in client's wishlist or not
  // add in wishlist db
  // return res

  const user = req.user;
  const { id } = req.body;

  if (user.type !== "Client") {
    throw new ApiError(401, "You are unauthorized to add in wishlist.");
  }

  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(401, "No such vehicle exists");
  }

  const existedWish = await Wishlist.findOne({
    client: user._id,
    vehicle: vehicle._id,
  });
  if (existedWish) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existedWish,
          "Vehicle already exists in your wishlist"
        )
      );
  }

  const wish = await Wishlist.create({
    client: user._id,
    vehicle: vehicle._id,
  });
  if (!wish) {
    throw new ApiError(500, "Failed to add in Wishlist, please try again");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, wish, "Vehicle added in your wishlist"));
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  // get user details from req.user
  //check if user is client or not
  // get vehicle id from req.body
  // check if vehicle exists or not
  // check if vehicle is present in users wishlist or not
  // delete wishlist
  // return res

  const user = req.user;
  if (user.type !== "Client") {
    throw new ApiError(401, "You are not a client ");
  }
  const { id } = req.body;
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(401, "No such vehicle exists");
  }

  const wish = await Wishlist.findOne({
    client: user._id,
    vehicle: vehicle._id,
  });
  if (!wish) {
    throw new ApiError(401, "Vehicle doesnot exists in your wishlist");
  }

  const deletedWish = await Wishlist.findByIdAndDelete(wish._id);
  if (!deletedWish) {
    throw new ApiError(500, "Failed to remove vehicle from wishlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedWish, "Vehicle removed successfully"));
});

const viewWishlist = asyncHandler(async (req, res) => {
  // get user details from req.user
  //check if user is client or not
  // get all wishlists where client is user
  // return res

  const user = req.user;

  if (user.type !== "Client") {
    throw new ApiError(401, "You are not a client ");
  }

  const wishlist = await Wishlist.find({ client: user._id });

  if (!wishlist) {
    throw new ApiError(401, "Vehicle doesnot exists in your wishlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, wishlist, "Your wishlist found"));
});

// cart controllers from client side

const addToCart = asyncHandler(async (req, res) => {
  // get user details from req.user
  // check if user is client or not
  // get vehicle id from req.body
  // check if vehicle exists or not
  // create new document in cart
  // return res

  const user = req.user;
  const { id, quantity } = req.body;
  if (user.type !== "Client") {
    throw new ApiError(400, "You are not authorized to add vehicle in cart");
  }
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(400, "No such vehicle exists");
  }

  const price = quantity * vehicle.price;
  let cart = await Cart.findOne({ client: user._id, vehicle: id });

  if (!cart) {
    cart = await Cart.create({
      client: user._id,
      vehicle: id,
      quantity,
      price,
    });
  } else {
    cart = await Cart.findByIdAndUpdate(
      cart._id,
      { quantity: quantity, price: price },
      { new: true }
    );
  }
  if (!cart) {
    throw new ApiError(500, "Failed to update cart, Please try again");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, cart, "Vehicle added in cart"));
});

const removeFromCart = asyncHandler(async (req, res) => {
  // get user details from req.user
  // check if user is client or not
  // get vehicle id from req.body
  // check if vehicle exists or not
  // remove it from cart
  // return res

  const user = req.user;
  const { id } = req.body;
  if (user.type !== "Client") {
    throw new ApiError(401, "You are not authorized to add vehicle in cart");
  }
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) {
    throw new ApiError(401, "No such vehicle exists");
  }

  let cart = await Cart.findOneAndDelete({ client: user._id, vehicle: id });

  if (!cart) {
    throw new ApiError(401, "Vehicle doesnot exist in cart");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Vehicle removed from cart"));
});

// order controllers from client side

const placeOrder = asyncHandler(async (req, res) => {
  // get user details from req.user
  // check if user is client or not
  // get cart id from req.body
  // check if cart exists or not
  // place order one by one
  // return res

  const user = req.user;
  if (user.type !== "Client") {
    throw new ApiError(400, "You are not authorized to place order");
  }
  const cart = await Cart.find({ client: user._id });

  const orders = await Promise.all(
    cart.map(async (vehicle) => {
      const renter = await Vehicle.findById(vehicle.vehicle).select("owner");
      if (!renter) {
        throw new ApiError(400, "No such vehicle exists");
      }
      return Order.create({
        client: user._id,
        vehicle: vehicle._id,
        renter: renter.owner,
        price: vehicle.price,
        quantity: vehicle.quantity,
      });
    })
  );

  if (!orders) {
    throw new ApiError(500, "Failed to place order");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, orders, "Order placed successfully"));
});

const viewOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user.type !== "Client") {
    throw new ApiError(409, "Unauthorized to access orders");
  }
  const orderListing = await Order.find({ client: user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, orderListing, "Your orders are here"));
});

const cancelOrder = asyncHandler(async (req, res) => {
  // get user details from req.user
  // check if user is client or not
  // get order id from req.body
  // check if order exists or not
  // update order status to canceled
  // return res

  const user = req.user;
  if (user.type !== "Client") {
    throw new ApiError(400, "You are not authorized to cancel order");
  }
  const { id } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    throw new ApiError(409, "No such order exists");
  }
  console.log(order.client.toString());
  console.log(user._id);
  if (order.client.toString() !== user._id.toString()) {
    throw new ApiError(409, "Unauthorized to cancel this order");
  }

  if (order.status === "Delivered" || order.status === "Rejected") {
    throw new ApiError(409, "Order can't be cancelled now");
  }

  if (order.status === "Cancelled") {
    throw new ApiError(400, "Order is already cancelled ");
  }

  const cancelledOrder = await Order.findByIdAndUpdate(
    order._id,
    { status: "Cancelled" },
    { new: true }
  );

  if (!cancelledOrder) {
    throw new ApiError(500, "Failed to cancel Order, Please try again");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, cancelledOrder, "Order cancelled successfully"));
});

export {
  viewListing,
  viewVehicle,
  addReview,
  deleteReview,
  addToWishlist,
  removeFromWishlist,
  viewWishlist,
  addToCart,
  removeFromCart,
  placeOrder,
  viewOrder,
  cancelOrder,
};
