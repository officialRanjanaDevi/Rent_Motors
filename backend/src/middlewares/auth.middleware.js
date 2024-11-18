import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const validateRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  body("type").notEmpty().withMessage("Please specify your type"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation failed",
          errors.array().map((error) => error.msg)
        )
      );
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        new ApiError(
          400,
          "Validation failed",
          errors.array().map((error) => error.msg)
        )
      );
    }
    next();
  },
];

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    console.log("Token.................",req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ", ""))
    const token =req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ", "");
   

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { validateRegistration, validateLogin, verifyJWT };
