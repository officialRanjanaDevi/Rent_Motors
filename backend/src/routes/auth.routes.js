import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateProfile,
} from "../controllers/auth.Controller.js";
import {
  validateRegistration,
  validateLogin,
  verifyJWT,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(validateRegistration, registerUser);

router.route("/login").post(validateLogin, loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refreshToken").post(refreshAccessToken);

router.route("/changePassword").patch(verifyJWT, changePassword);

router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

router.route("/updateProfile").patch(verifyJWT, updateProfile);

export default router;
