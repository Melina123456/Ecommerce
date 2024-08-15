import { Request, Response } from "express";
import { AddressSchema, updateUserSchema } from "./users.schema";
import { BadRequestsException, NotFoundException } from "../../utils/ApiError";
import {
  addAddressService,
  changeUserRoleService,
  deleteAddressService,
  getUserByIdservice,
  listAddressesService,
  listUsersService,
  updateAddressService,
  updateUserservice,
} from "./users.service";
export const addAddress = async (req: Request, res: Response) => {
  try {
    AddressSchema.parse(req.body);
    const data = req.body;
    const uid = req.user?.id || "0";
    const address = await addAddressService(data, +uid);
    res.json(address);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.id || "0";
    const deletedAddress = await deleteAddressService(+req.params.id, +uid);
    res.json({ deletedAddress });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const listAddresses = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.id || "0";
    console.log(uid);
    const address = await listAddressesService(+uid);
    res.json(address);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const id = req.user?.id;
    if (!id) {
      throw new NotFoundException("user not found");
    }
    const updatedUser = await updateUserservice(+id, validatedData);
    res.json(updatedUser);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const skip = req.query.skip?.toString() || "0";
    const take = req.query.take?.toString() || "0";
    const users = await listUsersService(+skip, +take);
    res.json(users);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdservice(+req.params.id);
    res.json(user);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const role = req.body.role;
    const updatedUser = await changeUserRoleService(+req.params.id, role);
    res.json(updatedUser);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestsException("Enter something to update");
    }
    const updatedAddress = await updateAddressService(+req.params.id, data);
    res.json(updatedAddress);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};
