import { NextFunction, Response, Request } from "express";
import { ErrorCode, UnauthorizedException } from "../utils/ApiError";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/secrets";
import { prismaClient } from "../prisma";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || "";

  if (!token) {
    return next(
      new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED)
    );
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      return next(
        new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED)
      );
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
};
export default authMiddleware;
