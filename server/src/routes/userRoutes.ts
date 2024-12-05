import express from "express";
import { Request, Response } from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
const router = express.Router();

// only admin can access this route
router.get(
  "/admin",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Admin route" });
  }
);

// Both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin", "manager"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Manager route" });
  }
);

// All can access this route
router.get(
  "/user",
  verifyToken,
  //@ts-ignore
  authorizeRoles("admin", "manager", "user"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "User route" });
  }
);

router.get("/getmyprofile", verifyToken, (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
