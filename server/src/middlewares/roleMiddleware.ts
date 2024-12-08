import { Request, Response, NextFunction } from "express";

const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore

    const { role } = req.user;
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export default authorizeRoles;
// In the code snippet above, we created a middleware function that checks if the role of the user making the request is included in the list of allowed roles. If the user's role is not included in the list of allowed roles, the middleware function returns a 403 Forbidden status code. Otherwise, the function calls the next middleware function in the stack.
