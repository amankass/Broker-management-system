import express from "express";
import {
  SignUp,
  UserSignUp,
  SignIn,
  google,
  signOut,
  ContactPage,
  forgotpassword,
  resetepassword,
  SystemPayment,
} from "../Controller/auth.controller.js";
import roleBasedProtection from "../Controller/RoleBasedCon.js";
import {
  deleteUserById,
  getallUser,
  loginAdmin,
} from "../Controller/user.controller.js";
import {
  getallBroker,
  deleteBrokerById,
  updateBrokerStatusById,
} from "../Controller/broker.controller.js";
import { getallComment, deleteCommentById } from "../Controller/ContactCtrl.js";

const router = express.Router();

router.post("/UserSignUp", UserSignUp);
router.post("/Contact", ContactPage);
router.post("/SignUp", SignUp);
router.post("/SystemPayment", SystemPayment);
router.post("/forgotpassword", forgotpassword);
router.post("/reset_password/:id/:token", resetepassword);
router.post("/SignIn", roleBasedProtection, SignIn);
router.post("/google", google);
router.get("/signout", signOut);
router.post("/admin-login", loginAdmin);
router.get("/", getallUser);
router.get("/getcomment", getallComment);
router.delete("/deletecomment/:id", deleteCommentById);
router.get("/get", getallBroker);
router.get("/delete/:id", deleteBrokerById);
router.patch("/update/:id", updateBrokerStatusById);
router.get("/udelete/:id", deleteUserById);

export default router;
