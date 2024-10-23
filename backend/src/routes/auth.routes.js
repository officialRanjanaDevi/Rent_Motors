import {Router } from "express";
import { registerUser ,loginUser, logoutUser, refreshAccessToken} from "../controllers/authController.js";
import { validateRegistration ,validateLogin ,verifyJWT} from "../middlewares/auth.middleware.js";


const router =Router ()

router.route("/register").post(validateRegistration,registerUser)

router.route("/login").post(validateLogin,loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refreshToken").post(refreshAccessToken)

export default router