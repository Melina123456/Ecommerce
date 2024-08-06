import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { JWT_SECRET } from "../secrets";
import { User } from "@prisma/client";

declare module "express" {
  interface Request {
    user?: User;
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. extract token from request headers
  const token = req.header("Authorization")?.replace("Bearer ", "") || "";
  // const token = req.headers.authorization || "";

  //2.if token is not present, throw unauthorized exception
  if (!token) {
    // throw new Error("hello");
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
  try {
    //3. if token is present, verify and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;
    // 4. to get user from the payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
    }
    // 5. to attach the user to the current request object
    // req["user"] = user;
    // req.user = user ;
    req.user = user ? user : undefined;
    console.log(req.user);
    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
};
export default authMiddleware;
