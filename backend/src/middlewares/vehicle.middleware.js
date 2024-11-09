import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validateVehicle = [
  body("title").notEmpty().withMessage("Title is required"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("type").notEmpty().withMessage("Please specify vehicle type"),
  body("price").notEmpty().withMessage("Price is required"),
  body("description").notEmpty().withMessage("Enter description"),
  body("fuel").notEmpty().withMessage("Enter fuel type of vehicle"),
  body("seater").notEmpty().withMessage("Enter number of seats in vehicle"),
  body("mileage").notEmpty().withMessage("mileage is required"),
  body("speed").notEmpty().withMessage("speed is required"),
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

export { validateVehicle };
