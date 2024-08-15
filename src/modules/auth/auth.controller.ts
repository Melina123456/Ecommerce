import { Request, Response } from "express";
import { SignUpSchema } from "../users/users.schema";
import { loginService, signupService } from "./auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    SignUpSchema.parse(req.body);
    const data = req.body;
    const user = await signupService(data);
    res.json(user);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await loginService(data.email, data.password);
    res.json(user);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};
