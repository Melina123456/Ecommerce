import { Request, Response } from "express";
import { changeQuantitySchema, createCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";
import { prismaClient } from "../prisma";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestsException } from "../exceptions/bad_requests";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = createCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Product not found.",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user?.id,
      productId: product.id,
      quantity: validatedData.quantity,
    } as any,
  });
  res.json(cart);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  const cartid = req.params.id;
  const cartItem = await prismaClient.cartItem.findFirstOrThrow({
    where: {
      id: +cartid,
    },
  });
  if (cartItem.userId !== req.user?.id) {
    throw new BadRequestsException(
      "the product does not belong to you to delete.",
      ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
    );
  }
  const deletedItem = await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ deletedItem: deletedItem, message: "Item deleted successfully" });
};

export const changeQuantity = async (req: Request, res: Response) => {
  const cartid = req.params.id;
  const cartItem = await prismaClient.cartItem.findFirstOrThrow({
    where: {
      id: +cartid,
    },
  });
  if (cartItem.userId !== req.user?.id) {
    throw new BadRequestsException(
      "the product does not belong to you to delete.",
      ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
    );
  }
  const validatedData = changeQuantitySchema.parse(req.body);
  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });
  res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user?.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
