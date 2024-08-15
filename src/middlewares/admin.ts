import { NextFunction, Request, Response } from "express";
import { ErrorCode, UnauthorizedException } from "../utils/ApiError";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role == "ADMIN") {
    next();
  } else {
    next(
      new UnauthorizedException(
        "unauthorized, you must be admin.",
        ErrorCode.UNAUTHORIZED
      )
    );
  }
};
export default adminMiddleware;
