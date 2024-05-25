import express from "express";
import cron from "node-cron";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
  getHouseListings,
  autoDeleteListings,
} from "../Controller/House-listctrl.js";
//import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
//import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", deleteListing);
router.post("/update/:id", updateListing);
router.get("/get/:id", getListing);
router.get("/get", getHouseListings);
cron.schedule("0 0 * * *", autoDeleteListings);
export default router;
