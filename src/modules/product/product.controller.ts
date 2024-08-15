import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../../utils/ApiError";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  listProductsService,
  searchProductsService,
  updateProductService,
} from "./product.service";
import { productSchema } from "./product.schema";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    productSchema.parse(req.body);
    const data = req.body;
    const tags = req.body.tags.join(",");
    const product = await createProductService(data, tags);
    res.json(product);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestsException("Enter something to update");
    }
    if (data.tags) {
      data.tags = data.tags.join(",");
    }
    const updatedProduct = await updateProductService(+req.params.id, data);
    res.json(updatedProduct);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProduct = await deleteProductService(+req.params.id);
    res.json({ deletedProduct });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = req.query.skip || "0";
    const take = req.query.take || "0";
    const data = await listProductsService(+skip, +take);
    res.json({ data });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await getProductByIdService(+req.params.id);
    res.json({ product });
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = req.query.skip?.toString() || "0";
    const search = req.query.q?.toString() || "0";
    const products = await searchProductsService(+skip, search);
    res.json(products);
  } catch (error) {
    console.log("controller", error);
    next(error);
  }
};
