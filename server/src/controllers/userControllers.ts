import { Request, Response } from "express";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { getMyProfile };
