import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";
// import { AuthRequest } from "./auth";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};
