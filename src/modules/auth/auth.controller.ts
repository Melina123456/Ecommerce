import { NextFunction, Request, Response } from "express";
import {
  loginService,
  refreshAccessTokenService,
  signupService,
} from "./auth.service";
import { SignUpSchema } from "../users/users.schema";
import { UnauthorizedException } from "../../utils/ApiError";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    SignUpSchema.parse(req.body);
    const data = req.body;
    const user = await signupService(data);
    res.json(user);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await loginService(data.email, data.password);
    res.json(user);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") || "";
    if (!token) {
      return next(new UnauthorizedException("Enter your token."));
    }
    const accessToken = await refreshAccessTokenService(token);
    res.json({ accessToken });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};
