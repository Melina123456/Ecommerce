import { NextFunction, Request, Response } from "express";
import {
  addItemToCartService,
  changeQuantityService,
  deleteItemFromCartService,
  getCartService,
} from "./carts.service";

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const uId = req.user.id;
    const cart = await addItemToCartService(data, +uId);
    res.json(cart);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const deleteItemFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedItem = await deleteItemFromCartService(
      +req.params.id,
      +req.user.id
    );
    res.json({ deletedItem });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const changeQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quantity = req.body;
    const updatedCart = await changeQuantityService(
      +req.params.id,
      +req.user.id,
      quantity
    );
    res.json({
      updatedCart,
      message: "quantity of item changed successfully.",
    });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await getCartService(+req.user.id);
    res.json(cart);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};
