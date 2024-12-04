import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: Request) => {
  let token;
  let authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  // check if token header is provided
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // check if token is in the correct format
  if (authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
