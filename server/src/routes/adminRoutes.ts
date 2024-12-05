import express from "express";
import { makeAdmin } from "../controllers/adminController";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
const router = express.Router();

//@ts-ignore
router.post("/makeadmin", verifyToken, authorizeRoles("admin"), makeAdmin);

export default router;
