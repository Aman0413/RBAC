import express from "express";
import { login, register } from "../controllers/authController";

const router = express.Router();

//@ts-ignore
router.post("/register", register);
//@ts-ignore
router.post("/login", login);

export default router;
