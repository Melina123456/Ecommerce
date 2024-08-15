import { BadRequestsException, NotFoundException } from "../../utils/ApiError";
import { CheckIfCartItemExists } from "../orders/orders.repository";
import {
  addItemToCartRepository,
  changeQuantityServiceRepo,
  checkIfOwnCartItemRepo,
  deleteItemFromCartRepository,
  getCartRepo,
  productNotFoundrepository,
} from "./carts.repository";
import { createCartDto } from "./dto/create_cart.dto";

export const addItemToCartService = async (
  data: createCartDto,
  uId: number
) => {
  const productExists = await productNotFoundrepository(data);
  if (!productExists) {
    throw new NotFoundException("Product not found.");
  }
  return addItemToCartRepository(data, uId);
};

export const deleteItemFromCartService = async (id: number, uId: number) => {
  const cartExists = await CheckIfCartItemExists(id);
  if (!cartExists) {
    throw new NotFoundException("Your cart is empty to delete.");
  }
  const ownItemDelete = await checkIfOwnCartItemRepo(id, uId);
  if (!ownItemDelete) {
    throw new BadRequestsException("please enter your own cart id to delete.");
  }
  return await deleteItemFromCartRepository(id);
};

export const changeQuantityService = async (
  id: number,
  uId: number,
  quantity: number
) => {
  const cartExists = await CheckIfCartItemExists(id);
  if (!cartExists) {
    throw new NotFoundException("you have no such cart id.");
  }
  const ownItem = await checkIfOwnCartItemRepo(id, uId);
  if (!ownItem) {
    throw new BadRequestsException(
      "please enter your own cart id number to update quantity."
    );
  }
  return await changeQuantityServiceRepo(id, quantity);
};

export const getCartService = async (uId: number) => {
  return getCartRepo(uId);
};
