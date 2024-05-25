import express from "express";
import { combineListController } from "../Controller/combinelist-ctrl.js";

const router = express.Router();

router.get("/get", combineListController);

export default router;
