import express from "express";

import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} from "../Controller/brandctrl";
//import { authMiddleware, isAdmin } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

export default router;
