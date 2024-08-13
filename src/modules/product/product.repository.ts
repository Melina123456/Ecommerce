import { Product } from "@prisma/client";
import { prismaClient } from "../../prisma";

export class ProductRepository {
  createProductRepository = async (data: Product, tags: string) => {
    try {
      const product = await prismaClient.product.create({
        data: {
          ...data,
          tags,
        },
      });
      console.log(product);
      return product;
    } catch (error) {
      console.log("repo", error);
      throw error;
    }
  };
  checkIfProductNameExistsRepository = async (name: string) => {
    return await prismaClient.product.findFirst({
      where: {
        name,
      },
    });
  };
}
