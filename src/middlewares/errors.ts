import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/ApiError";

// export const errorMiddleware = (
//   error: HttpException,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log({ error123: error });
//   res.status(error.statusCode).json({
//     message: error.message,
//     errorCode: error.errorCode,
//     errors: error.errors,
//   });
// };

// import { Request, Response, NextFunction } from "express";
import {
  BadRequestsException,
  // ErrorCode,
  InternalException,
} from "../utils/ApiError";
import { ZodError } from "zod";

export const errorMiddleware = <T>(
  err: T[],
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let exception: HttpException;
  if (err instanceof HttpException) {
    exception = err;
  } else {
    if (err instanceof ZodError) {
      exception = new BadRequestsException("unprocessable entity", err);
    } else {
      exception = new InternalException("something went wrong!", err);
    }
  }
  console.log({ exception });
  res.status(exception.statusCode).json({
    message: exception.message,
    errors: exception.errors,
  });
};
