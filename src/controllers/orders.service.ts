import { prismaClient } from "..";
import { cancelOrderRepository } from "./orders.repository";

export const cancelOrderService = async (id: number) => {
    const order = 
  return cancelOrderRepository(id);
};
