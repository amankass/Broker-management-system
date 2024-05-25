import express from "express";
import { deletePayment, getPaymentList } from "../Controller/PaymentCtrl.js";
const router = express.Router();

router.get("/gett", getPaymentList);
router.delete("/deletee/:id", deletePayment);

export default router;
