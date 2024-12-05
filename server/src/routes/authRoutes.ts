import express from "express";
import { login, logout, register } from "../controllers/authController";

const router = express.Router();

//@ts-ignore
router.post("/register", register);
//@ts-ignore
router.post("/login", login);
//@ts-ignore
router.post("/logout", logout);

export default router;
