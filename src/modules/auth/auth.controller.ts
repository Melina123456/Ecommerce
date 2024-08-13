import { Request, Response } from "express";
import { SignUpSchema } from "../../schema/users";
import { loginService, meService, signupService } from "./auth.service";

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
    const uid = req.user?.id || "0";
    console.log(uid);
    const user = meService(+uid);
    // const user = res.json(req.user?.id);
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};
