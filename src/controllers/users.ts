import { Request, Response } from "express";
import { AddressSchema, updateUserSchema } from "../schema/users";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { Address } from "@prisma/client";
import { BadRequestsException } from "../exceptions/bad_requests";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const deletedData = await prismaClient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ deletedData, message: "Address deleted successfully" });
  } catch (error) {
    throw new NotFoundException(
      "Address not found.",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};

export const listAddresses = async (req: Request, res: Response) => {
  const address = await prismaClient.address.findMany({
    where: {
      id: req.user?.id,
    },
  });
  res.json(address);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = updateUserSchema.parse(req.body);
  console.log(validatedData);
  let shippingAddresses: Address;
  let billingAddresses: Address;
  if (validatedData.defaultShippingAddresses) {
    try {
      shippingAddresses = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddresses,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Shipping address not found.",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (shippingAddresses.userId !== req.user?.id) {
      throw new BadRequestsException(
        "Address does not belong to the user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
      );
    }
  }
  if (validatedData.defaultBillingAddresses) {
    try {
      billingAddresses = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddresses,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        "Shipping address not found.",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (billingAddresses.userId !== req.user?.id) {
      throw new BadRequestsException(
        "Address does not belong to the user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
      );
    }
  }

  const updateUser = await prismaClient.user.update({
    where: {
      id: req.user?.id,
    },
    data: validatedData,
  });
  res.json(updateUser);
};

export const listUsers = async (req: Request, res: Response) => {
  const skip = req.query.skip?.toString() || "0";
  const users = await prismaClient.user.findMany({
    skip: +skip || 0,
    take: 5,
  });
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
      include: {
        addresses: true,
      },
    });
    res.json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.update({
      where: {
        id: +req.params.id,
      },
      data: {
        role: req.body.role,
      },
    });
    res.json(user);
  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
