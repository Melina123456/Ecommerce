import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { User } from "@prisma/client";
import { prismaClient } from "../prisma";

declare module "express" {
  interface Request {
    user?: User;
  }
}

// export interface AuthRequest extends Request {
//   // user?: User;
//   user: {
//     id: number;
//     email: string;
//   };
// }

const authMiddleware = async (
  // req: AuthRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || "";

  if (!token) {
    // throw new Error("hello");
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
    // else {
    //   req.user = user;
    //   console.log(req.user);
    //   next();
    // }
    // req.user = {
    //   id: user.id,
    //   email: user.email,
    // };
    // console.log(req.user);
    // next();

    // 5. to attach the user to the current request object
    // req["user"] = user;
    // req.user = user ;
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    next(new UnauthorizedException("unauthorized", ErrorCode.UNAUTHORIZED));
  }
};
export default authMiddleware;
