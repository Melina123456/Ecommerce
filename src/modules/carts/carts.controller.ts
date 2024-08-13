import { Request, Response } from "express";
import {
  addItemToCartService,
  changeQuantityService,
  deleteItemFromCartService,
  getCartService,
} from "./carts.service";

export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const uId = req.user?.id || "0";
    const cart = await addItemToCartService(data, +uId);
    res.json(cart);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  try {
    const uId = req.user?.id || "0";
    const deletedItem = await deleteItemFromCartService(+req.params.id, +uId);
    res.json({ deletedItem });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const changeQuantity = async (req: Request, res: Response) => {
  try {
    const uId = req.user?.id || "0";
    const quantity = req.body;
    const updatedCart = await changeQuantityService(
      +req.params.id,
      +uId,
      quantity
    );
    res.json({
      updatedCart,
      message: "quantity of item changed successfully.",
    });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const uid = req.user?.id || "0";
    const cart = await getCartService(+uid);
    res.json(cart);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};
