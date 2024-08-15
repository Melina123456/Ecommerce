import { Product } from "@prisma/client";
import { prismaClient } from "../../prisma";

export const createProductRepository = async (data: Product, tags: string) => {
  try {
    const product = await prismaClient.product.create({
      data: {
        ...data,
        tags,
      },
    });
    return product;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const checkIfProductNameExistsRepository = async (name: string) => {
  return await prismaClient.product.findFirst({
    where: {
      name,
    },
  });
};

export const updateProductRepo = async (id: number, data: Product) => {
  try {
    const updatedProduct = await prismaClient.product.update({
      where: {
        id,
      },
      data,
    });
    return updatedProduct;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const checkIfProductExists = async (id: number) => {
  return await prismaClient.product.findFirstOrThrow({
    where: {
      id,
    },
  });
};

export const listProductsRepository = async (skip: number, take: number) => {
  try {
    const products = await prismaClient.product.findMany({
      skip,
      take,
    });
    const count = await prismaClient.product.count();
    return { count, products };
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const getProductByIdRepository = async (id: number) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const searchProductsRepo = async (skip: number, search: string) => {
  const products = await prismaClient.product.findMany({
    skip: +skip || 0,
    take: 2,
    where: {
      name: {
        search,
      },
      description: {
        search,
      },
    },
  });
  return products;
};

export const deleteProductRepo = async (id: number) => {
  try {
    const deletedProduct = await prismaClient.product.delete({
      where: {
        id,
      },
    });
    return deletedProduct;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};
