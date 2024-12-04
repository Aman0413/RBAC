import express from "express";
import { Request, Response } from "express";
import verifyToken from "../middlewares/authMiddleware";
const router = express.Router();

// only admin can access this route
router.get("/admin", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "Admin route" });
});

// Both admin and manager can access this route
router.get("/manager", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "Manager route" });
});

// All can access this route
router.get("/user", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "User route" });
});

export default router;
