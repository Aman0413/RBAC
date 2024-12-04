import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register controller
const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // check if all fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // if user does not exist, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = await userModel.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    // check if user was created
    if (!newUser) {
      return res.status(400).json({ message: "Could not create user" });
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
