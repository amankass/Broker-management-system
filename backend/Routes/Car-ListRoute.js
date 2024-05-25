import express from "express";
import {
  createListing,
  deleteListings,
  getListings,
  updateListings,
  getCarListings,
  CarautoDeleteListings,
} from "../Controller/Car-listctrl.js";
import cron from "node-cron";
const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", deleteListings);
router.post("/update/:id", updateListings);
router.get("/get/:id", getListings);
router.get("/get", getCarListings);
cron.schedule("0 0 * * *", CarautoDeleteListings);

export default router;
