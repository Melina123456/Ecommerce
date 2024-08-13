import { changeQuantitySchema, createCartSchema } from "../../schema/cart";
import { createCartDto } from "./dto/create_cart.dto";
import { prismaClient } from "../../prisma";

export const addItemToCartRepository = async (
  data: createCartDto,
  uId: number
) => {
  try {
    const validatedData = createCartSchema.parse(data);
    const existingCartItem = await prismaClient.cartItem.findFirst({
      where: {
        userId: uId,
        productId: validatedData.productId,
      },
    });
    if (existingCartItem) {
      const updatedCartItem = await prismaClient.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: {
            increment: validatedData.quantity,
          },
        },
      });
      return updatedCartItem;
    } else {
      const newcart = await prismaClient.cartItem.create({
        data: {
          userId: uId,
          productId: validatedData.productId,
          quantity: validatedData.quantity,
        },
      });
      return newcart;
    }
  } catch (error) {
    console.log("repo", error);
    return error;
  }
};

export const productNotFoundrepository = async (data: createCartDto) => {
  return await prismaClient.product.findFirst({
    where: {
      id: data.productId,
    },
  });
};

export const checkIfOwnCartItemRepo = async (id: number, uId: number) => {
  return await prismaClient.cartItem.findFirst({
    where: {
      id,
      userId: uId,
    },
  });
};

export const deleteItemFromCartRepository = async (id: number) => {
  const deletedItem = await prismaClient.cartItem.delete({
    where: {
      id,
    },
  });
  return deletedItem;
};

export const changeQuantityServiceRepo = async (
  id: number,
  quantity: number
) => {
  const validatedData = changeQuantitySchema.parse(quantity);
  const updatedCart = await prismaClient.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });
  return updatedCart;
};

export const getCartRepo = async (uId: number) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: uId,
    },
    include: {
      product: true,
    },
  });
  return cart;
};
