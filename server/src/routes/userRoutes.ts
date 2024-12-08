import express from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
import {
  fetchAllTasks,
  getMyProfile,
  markTaskAsCompleted,
} from "../controllers/userControllers";

const router = express.Router();

//@ts-ignore
router.get(
  "/getmyprofile",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin", "manager", "user"),
  getMyProfile
);
//@ts-ignore
router.post(
  "/marktaskascompleted",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin", "manager", "user"),
  markTaskAsCompleted
);
//@ts-ignore
router.get(
  "/alltasks",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin", "manager", "user"),
  fetchAllTasks
);

export default router;
