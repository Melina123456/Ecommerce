import {
  BadRequestsException,
  ConflictErrorException,
  NotFoundException,
} from "../../utils/ApiError";
import {
  cancelOrderRepository,
  changeOrderStatusRepository,
  CheckIfCartItemExists,
  checkIfOrderExistsRepository,
  createOrderRepository,
  getOrderByIdRepository,
  getOrderofUserRepository,
  listAllOrdersRepository,
  listOrdersRepository,
} from "./orders.repository";

export const createOrderService = async (
  uId: number,
  defaultBillingAddresses: number
) => {
  const cartItems = await CheckIfCartItemExists(uId);
  console.log(cartItems);
  if (!cartItems) {
    throw new NotFoundException("cart is empty");
  }
  return createOrderRepository(uId, defaultBillingAddresses);
};

export const cancelOrderService = async (id: number, uId: number) => {
  const OrdersExists = await checkIfOrderExistsRepository(id);
  if (!OrdersExists) {
    throw new NotFoundException("Order not found");
  }
  if (OrdersExists.userId !== uId) {
    throw new BadRequestsException("The order doesn't belong to you to cancel");
  }
  if (OrdersExists.status === "CANCELLED") {
    throw new ConflictErrorException("Order already cancelled");
  }
  return cancelOrderRepository(id);
};

export const listOrdersService = async (id: number) => {
  return listOrdersRepository(id);
};

export const getOrderOfUserService = async (uId: number) => {
  return getOrderofUserRepository(uId);
};

export const getOrderByIdService = async (id: number) => {
  const OrdersExists = await checkIfOrderExistsRepository(id);
  if (!OrdersExists) {
    throw new NotFoundException("Order not found.");
  }
  return getOrderByIdRepository(id);
};

export const listAllOrdersService = async (
  status: string,
  skip: number,
  take: number
) => {
  return listAllOrdersRepository(status, +skip, +take);
};

export const ChangeOrderStatusService = async (id: number, status: string) => {
  const OrdersExists = await checkIfOrderExistsRepository(id);
  if (!OrdersExists) {
    throw new NotFoundException("order of given id not found.");
  }
  return changeOrderStatusRepository(id, status);
};
