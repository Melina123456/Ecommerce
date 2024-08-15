import { NextFunction, Request, Response } from "express";
import {
  cancelOrderService,
  ChangeOrderStatusService,
  createOrderService,
  getOrderByIdService,
  getOrderOfUserService,
  listAllOrdersService,
  listOrdersService,
} from "./orders.service";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //     1. to create the transaction
  //     2. to list all the cart items and proceed if the cart is not empty
  //     3. calculat the total amount
  //     4. fetch address of user
  //     5. to define computed field for formatted address on address module
  //     6. we will create order and order products
  //     7. create event
  //     8. to empty the cart
  try {
    const uId = req.user.id;
    const defaultBillingAddresses = req.user.defaultBillingAddresses;
    if (!defaultBillingAddresses) {
      throw new Error("no billing address.");
    }
    const orders = await createOrderService(+uId, defaultBillingAddresses);
    res.json(orders);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const listOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orders = await listOrdersService(+req.user.id);
  console.log(orders);
  res.json(orders);
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await cancelOrderService(+req.params.id, +req.user.id);
    res.json(data);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const getOrderOfUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await getOrderOfUserService(+req.user.id);
    res.json({ order });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await getOrderByIdService(+req.params.id);
    res.json({ order });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const listAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = req.query.skip || "0";
    const take = req.query.take || "0";
    const status = req.query.status?.toString() || "0";
    const orders = await listAllOrdersService(status, +skip, +take);
    res.json(orders);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const changeStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: string = req.body.status?.toString() || "0";
    const order = await ChangeOrderStatusService(+req.params.id, status);
    res.json(order);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};
