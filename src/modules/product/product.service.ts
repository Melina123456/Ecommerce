import { Product } from "@prisma/client";
import { BadRequestsException } from "../../utils/ApiError";
import {
  checkIfProductExists,
  checkIfProductNameExistsRepository,
  createProductRepository,
  deleteProductRepo,
  getProductByIdRepository,
  listProductsRepository,
  searchProductsRepo,
  updateProductRepo,
} from "./product.repository";

export const createProductService = async (data: Product, tags: string) => {
  const productNameExists = await checkIfProductNameExistsRepository(data.name);
  if (productNameExists) {
    throw new BadRequestsException(
      "The product name already exitst, switch to another name"
    );
  }
  return await createProductRepository(data, tags);
};

export const updateProductService = async (id: number, data: Product) => {
  await checkIfProductExists(id);
  return await updateProductRepo(id, data);
};

export const listProductsService = async (skip: number, take: number) => {
  return await listProductsRepository(skip, take);
};

export const getProductByIdService = async (id: number) => {
  return getProductByIdRepository(id);
};

export const searchProductsService = async (skip: number, search: string) => {
  return await searchProductsRepo(skip, search);
};

export const deleteProductService = async (id: number) => {
  await checkIfProductExists(id);
  return deleteProductRepo(id);
};
