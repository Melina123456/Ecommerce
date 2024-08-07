import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";
import { cancelOrderService } from "./orders.service";

export const createOrder = async (req: Request, res: Response) => {
  //     1. to create the transaction
  //     2. to list all the cart items and proceed if the cart is not empty
  //     3. calculat the total amount
  //     4. fetch address of user
  //     5. to define computed field for formatted address on address module
  //     6. we will create order and order products
  //     7. create event
  //     8. to empty the cart
  return await prismaClient.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user?.id,
      },
      include: {
        product: true,
      },
    });
    if (cartItems.length === 0) {
      return res.json({ message: "cart is empty" });
    }
    const price = cartItems.reduce((prev, current) => {
      return prev + current.quantity * +current.product.price;
    }, 0);
    const address = await tx.address.findFirst({
      where: {
        id: req.user?.defaultBillingAddresses as any,
      },
    });
    const order = await tx.order.create({
      data: {
        userId: req.user?.id,
        netAmount: price,
        address: address?.formattedAddress,
        products: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity,
            };
          }),
        },
      } as any,
    });
    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: order.id,
      },
    });
    await tx.cartItem.deleteMany({
      where: {
        userId: req.user?.id,
      },
    });
    return res.json(order);
  });
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const data = await cancelOrderService(+req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        userId: req.user?.id,
      },
      include: {
        products: true,
        events: true,
      },
    });
    res.json(order);
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const listAllOrders = async (req: Request, res: Response) => {
  const skip = req.query.skip?.toString() || "0";
  let whereClause = {};
  const status = req.query.status;
  if (status) {
    whereClause = {
      status,
    };
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +skip || 0,
    take: 5,
  });
  res.json(orders);
};

export const changeStatus = async (req: Request, res: Response) => {
  //wrap it inside transaction
  try {
    const order = await prismaClient.order.update({
      where: {
        id: +req.params.id,
      },
      data: {
        status: req.body.status,
      },
    });
    await prismaClient.orderEvent.create({
      data: {
        orderId: order.id,
        status: req.body.status,
      },
    });
    res.json(order);
  } catch (error) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const listUserOrders = async (req: Request, res: Response) => {
  const skip = req.query.skip?.toString() || "0";
  let whereClause: any = {
    userId: +req.params.id,
  };
  const status = req.params.status;
  if (status) {
    whereClause = {
      ...whereClause,
      status,
    };
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +skip || 0,
    take: 5,
  });
  res.json(orders);
};
