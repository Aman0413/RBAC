import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  let token;
  let authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  // check if token header is provided
  if (!authHeader || authHeader === undefined) {
    res.status(401).json({ message: "Please provide token" });
  }

  // check if token is in the correct format
  if (authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // check if token is provided
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // verify token
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    req.user = decoded;
    console.log("decoded", decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
