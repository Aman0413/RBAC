import express from "express";
import {
  addTask,
  deleteUser,
  getAllUsers,
  makeAdmin,
  removeTask,
  showAllTasks,
  updateTask,
} from "../controllers/adminController";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
const router = express.Router();

//@ts-ignore
router.post("/makeadmin", verifyToken, authorizeRoles("admin"), makeAdmin);
//@ts-ignore
router.post("/addtask", verifyToken, authorizeRoles("admin"), addTask);
//@ts-ignore
router.post("/removetask", verifyToken, authorizeRoles("admin"), removeTask);
//@ts-ignore
router.post("/updatetask", verifyToken, authorizeRoles("admin"), updateTask);
//@ts-ignore
router.get("/alltasks", verifyToken, authorizeRoles("admin"), showAllTasks);
//@ts-ignore
router.get("/allusers", verifyToken, authorizeRoles("admin"), getAllUsers);
//@ts-ignore
router.delete(
  `/deleteuser/:userId`,
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin"),
  deleteUser
);

export default router;
