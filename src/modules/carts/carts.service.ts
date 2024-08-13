import { BadRequestsException } from "../../exceptions/bad_requests";
import { NotFoundException } from "../../exceptions/not_found";
import { ErrorCode } from "../../exceptions/root";
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
    throw new NotFoundException(
      "Product not found.",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  return addItemToCartRepository(data, uId);
};

export const deleteItemFromCartService = async (id: number, uId: number) => {
  const cartExists = await CheckIfCartItemExists(id);
  if (!cartExists) {
    throw new NotFoundException(
      "Your cart is empty to delete.",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  const ownItemDelete = await checkIfOwnCartItemRepo(id, uId);
  if (!ownItemDelete) {
    throw new BadRequestsException(
      "please enter your own cart id to delete.",
      ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
    );
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
    throw new NotFoundException(
      "you have no such cart id.",
      ErrorCode.CARTITEM_NOT_FOUND
    );
  }
  const ownItem = await checkIfOwnCartItemRepo(id, uId);
  if (!ownItem) {
    throw new BadRequestsException(
      "please enter your own cart id number to update quantity.",
      ErrorCode.CARTITEM_DOES_NOT_BELONG_TO_USER
    );
  }
  return await changeQuantityServiceRepo(id, quantity);
};

export const getCartService = async (uId: number) => {
  return getCartRepo(uId);
};
