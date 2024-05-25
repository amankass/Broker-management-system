import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProduct,
  getaProduct,
  rating,
  updateProduct,
} from "../Controller/Product-controler.js";
import { isAdmin, verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.get("/", getAllProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);
router.put("/wishlist", verifyToken, addToWishlist);
router.put("/rating", rating);

export default router;
