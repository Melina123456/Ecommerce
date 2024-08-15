import {
  BadRequestsException,
  ConflictErrorException,
  ErrorCode,
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
    throw new NotFoundException("cart is empty", ErrorCode.PRODUCT_NOT_FOUND);
  }
  return createOrderRepository(uId, defaultBillingAddresses);
};

export const cancelOrderService = async (id: number, uId: number) => {
  const OrdersExists = await checkIfOrderExistsRepository(id);
  if (!OrdersExists) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
  if (OrdersExists.userId !== uId) {
    throw new BadRequestsException(
      "The order doesn't belong to you to cancel",
      ErrorCode.ORDER_DOES_NOT_BELONG_TO_USER
    );
  }
  if (OrdersExists.status === "CANCELLED") {
    throw new ConflictErrorException(
      "Order already cancelled",
      ErrorCode.ORDER_ALREADY_CANCELLED
    );
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
    throw new NotFoundException("Order not found.", ErrorCode.ORDER_NOT_FOUND);
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
    throw new NotFoundException(
      "order of given id not found.",
      ErrorCode.ORDER_NOT_FOUND
    );
  }
  return changeOrderStatusRepository(id, status);
};
