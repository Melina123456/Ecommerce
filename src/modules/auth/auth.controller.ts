import { NextFunction, Request, Response } from "express";
import { loginService, signupService } from "./auth.service";
import { SignUpSchema } from "../users/users.schema";

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

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};
