import { Request, Response } from "express";
import { prismaClient } from "../../prisma";
import { NotFoundException } from "../../exceptions/not_found";
import { ErrorCode } from "../../exceptions/root";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  listProductsService,
  searchProductsService,
  updateProductService,
} from "./product.service";
import { productSchema } from "./product.schema";
import { BadRequestsException } from "../../exceptions/bad_requests";

export const createProduct = async (req: Request, res: Response) => {
  try {
    productSchema.parse(req.body);
    const data = req.body;
    const tags = req.body.tags.join(",");
    const product = await createProductService(data, tags);
    res.json(product);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestsException(
        "Enter something to update",
        ErrorCode.DATA_NOT_FOUND
      );
    }
    if (data.tags) {
      data.tags = data.tags.join(",");
    }
    const updatedProduct = await updateProductService(+req.params.id, data);
    res.json(updatedProduct);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await deleteProductService(+req.params.id);
    res.json({ deletedProduct });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    const skip = req.query.skip || "0";
    const take = req.query.take || "0";
    const data = await listProductsService(+skip, +take);
    res.json({ data });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(+req.params.id);
    res.json({ product });
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const skip = req.query.skip?.toString() || "0";
    const search = req.query.q?.toString() || "0";
    const products = await searchProductsService(+skip, search);
    res.json(products);
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};