import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/ApiError";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user?.role == "ADMIN") {
      next();
    } else {
      next(new UnauthorizedException("unauthorized, you must be admin."));
    }
  } catch (error) {
    console.log("middleware", error);
    next(error);
  }
};
export default adminMiddleware;
