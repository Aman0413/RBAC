import express from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
import { getMyProfile } from "../controllers/userControllers";

const router = express.Router();

//@ts-ignore
router.get(
  "/getmyprofile",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin", "manager", "user"),
  getMyProfile
);

export default router;
