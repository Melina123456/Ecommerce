import { Request, Response } from "express";
import {
  cancelOrderService,
  ChangeOrderStatusService,
  createOrderService,
  getOrderByIdService,
  getOrderOfUserService,
  listAllOrdersService,
  listOrdersService,
} from "./orders.service";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  //     1. to create the transaction
  //     2. to list all the cart items and proceed if the cart is not empty
  //     3. calculat the total amount
  //     4. fetch address of user
  //     5. to define computed field for formatted address on address module
  //     6. we will create order and order products
  //     7. create event
  //     8. to empty the cart
  try {
    if (!req.user) {
      throw new NotFoundException("user not found", ErrorCode.USER_NOT_FOUND);
    }
    const uId = req.user.id;
    const defaultBillingAddresses = req.user.defaultBillingAddresses;
    if (!defaultBillingAddresses) {
      throw new Error("no billing address.");
    }
    const orders = await createOrderService(+uId, defaultBillingAddresses);
    res.json(orders);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
  //   return await prismaClient.$transaction(async (tx) => {
  //     const cartItems = await tx.cartItem.findMany({
  //       where: {
  //         userId: req.user?.id,
  //       },
  //       include: {
  //         product: true,
  //       },
  //     });
  //     if (cartItems.length === 0) {
  //       return res.json({ message: "cart is empty" });
  //     }
  //     const price = cartItems.reduce((prev, current) => {
  //       return prev + current.quantity * +current.product.price;
  //     }, 0);
  //     const address = await tx.address.findFirst({
  //       where: {
  //         id: req.user?.defaultBillingAddresses as any,
  //       },
  //     });
  //     const order = await tx.order.create({
  //       data: {
  //         userId: req.user?.id,
  //         netAmount: price,
  //         address: address?.formattedAddress,
  //         products: {
  //           create: cartItems.map((cart) => {
  //             return {
  //               productId: cart.productId,
  //               quantity: cart.quantity,
  //             };
  //           }),
  //         },
  //       } as any,
  //     });
  //     const orderEvent = await tx.orderEvent.create({
  //       data: {
  //         orderId: order.id,
  //       },
  //     });
  //     await tx.cartItem.deleteMany({
  //       where: {
  //         userId: req.user?.id,
  //       },
  //     });
  //     return res.json(order);
  //   });
};

export const listOrders = async (req: Request, res: Response) => {
  const id = req.user?.id?.toString() || "0";
  const orders = await listOrdersService(+id);
  console.log(orders);
  res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const uId = req.user?.id?.toString() || "0";
    const data = await cancelOrderService(+req.params.id, +uId);
    res.json(data);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const getOrderOfUser = async (req: Request, res: Response) => {
  try {
    const uId = req.user?.id?.toString() || "0";
    const order = await getOrderOfUserService(+uId);
    res.json({ order });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await getOrderByIdService(+req.params.id);
    res.json({ order });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const listAllOrders = async (req: Request, res: Response) => {
  try {
    const skip = req.query.skip || "0";
    const take = req.query.take || "0";
    const status = req.query.status?.toString() || "0";
    const orders = await listAllOrdersService(status, +skip, +take);
    res.json(orders);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const status: string = req.body.status?.toString() || "0";
    const order = await ChangeOrderStatusService(+req.params.id, status);
    res.json(order);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

// export const listUserOrders = async (req: Request, res: Response) => {
//   try {
//     const skip = req.query.skip || "0";
//     const take = req.query.take || "0";
//     const orders = await listUserOrdersService(+req.params.id, +skip, +take);
//     res.json(orders);
//   } catch (error) {
//     console.log("controller", error);
//     throw error;
//   }
//   // const skip = req.query.skip?.toString() || "0";
//   // let whereClause: any = {
//   //   userId: +req.params.id,
//   // };
//   // const status = req.params.status;
//   // if (status) {
//   //   whereClause = {
//   //     ...whereClause,
//   //     status,
//   //   };
//   // }
//   // const orders = await prismaClient.order.findMany({
//   //   where: whereClause,
//   //   skip: +skip || 0,
//   //   take: 5,
//   // });
//   // res.json(orders);
// };
