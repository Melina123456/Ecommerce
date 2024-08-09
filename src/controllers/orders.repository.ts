import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not_found";
import { ErrorCode } from "../exceptions/root";

export const cancelOrderRepository = async (id: number) => {
  try {
    await prismaClient.$transaction(async (tx) => {
      //1. wrap it inside transaction
      // 2. check if the user is cancelling its own order

      const order = await tx.order.update({
        where: {
          id,
        },
        data: {
          status: "CANCELLED",
        },
      });
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
          status: "CANCELLED",
        },
      });
      return order;
      //   res.json(order);
    });
  } catch (error) {
    console.error(error);
    throw error;
    // throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};
