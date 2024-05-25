import express from "express";
import {
  test,
  getUserListings,
  deleteBroker,
  getBroker,
  updateBroker,
  getUser,
} from "../Controller/broker.controller.js";
//import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/listings/:id", getUserListings);
router.get("/get/:id", getBroker);
router.post("/update/:id", updateBroker);
router.delete("/delete/:id", deleteBroker);
router.get("/:id", getUser);

export default router;
