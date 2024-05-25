import express from "express";
import {
  deleteUser,
  getUser,
  test,
  updateUser,
} from "../Controller/user.controller.js";
//import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/get/:id", getUser);
router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
