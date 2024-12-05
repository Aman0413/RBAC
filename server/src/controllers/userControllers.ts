import { Request, Response } from "express";
import User from "../models/userModel";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { id } = req.user;
    console.log("ID", id);
    if (!id) return res.status(400).json({ message: "Invalid user" });

    // find user by id
    const user = await User.findById(id).select("-password");

    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getMyProfile };
