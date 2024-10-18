import {Router } from "express";
import { registerUser } from "../controllers/shared.controllers/registerController.js";

const router =Router ()

router.route("/").post(registerUser)

export default router