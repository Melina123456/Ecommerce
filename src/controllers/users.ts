import { Request, Response } from "express";
import { AddressSchema } from "../schema/users";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);
  try {
  } catch (error) {}
};

export const deleteAddress = async (req: Request, res: Response) => {};

export const listAddresses = async (req: Request, res: Response) => {};
