import { Router } from "express";
import { viewListing, viewVehicle } from "../controllers/client.Controller.js";

const router = Router();

router.route("/viewListing").get(viewListing);
router.route("/viewVehicle").get(viewVehicle);

export default router;
