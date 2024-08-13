import { prismaClient } from "../../prisma";

export const cancelOrderRepository = async (id: number) => {
  try {
    const order = await prismaClient.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: {
          id,
        },
        data: {
          status: "CANCELLED",
        },
      });
      await tx.orderEvent.create({
        data: {
          orderId: updatedOrder.id,
          status: "CANCELLED",
        },
      });
      return updatedOrder;
    });
    return order;
  } catch (error) {
    console.error("repo", error);
    throw error;
  }
};

export const checkIfOrderExistsRepository = async (id: number) => {
  return await prismaClient.order.findUnique({
    where: {
      id,
      // status: { not: "CANCELLED" },
    },
  });
};

export const listOrdersRepository = async (userId: number) => {
  try {
    const orders = await prismaClient.order.findMany({
      where: {
        userId,
      },
    });
    return orders;
  } catch (error) {
    console.error("repo", error);
    throw error;
  }
};

export const getOrderofUserRepository = async (userId: number) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        userId,
      },
      include: {
        products: true,
        events: true,
      },
    });
    return order;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const getOrderByIdRepository = async (id: number) => {
  try {
    const order = await prismaClient.order.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
        events: true,
      },
    });
    return order;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const listAllOrdersRepository = async (
  status: string,
  skip: number,
  take: number
) => {
  let whereClause = {};
  if (status) {
    whereClause = {
      status,
    };
  }
  const orders = await prismaClient.order.findMany({
    where: whereClause,
    skip: +skip || 0,
    take: +take || 5,
  });
  return orders;
};

export const changeOrderStatusRepository = async (id: number, status: any) => {
  try {
    const order = await prismaClient.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
      await tx.orderEvent.create({
        data: {
          orderId: updatedOrder.id,
          status,
        },
      });
      return updatedOrder;
    });
    return order;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const createOrderRepository = async (
  userId: number,
  defaultBillingAddresses: number
) => {
  try {
    return await prismaClient.$transaction(async (tx) => {
      const cartItems = await tx.cartItem.findMany({
        where: {
          userId,
        },
        include: {
          product: true,
        },
      });
      const price = cartItems.reduce((prev, current) => {
        return prev + current.quantity * +current.product.price;
      }, 0);
      const address = await tx.address.findFirst({
        where: {
          id: defaultBillingAddresses,
        },
      });
      const order = await tx.order.create({
        data: {
          userId,
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
      await tx.orderEvent.create({
        data: {
          orderId: order.id,
        },
      });
      await tx.cartItem.deleteMany({
        where: {
          userId,
        },
      });
      return order;
    });
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const CheckIfCartItemExists = async (id: number) => {
  return await prismaClient.cartItem.findFirst({
    where: {
      id,
    },
  });
};
