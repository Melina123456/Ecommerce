import { Router } from "express";
import adminMiddleware from "../../middlewares/admin";
import authMiddleware from "../../middlewares/auth";
import { productController } from "./product.controller";
import { errorHandler } from "../../middlewares/error_handler";

const ProductsRoutes: Router = Router();
const controller = new productController();

ProductsRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(controller.createProduct)
);

export default ProductsRoutes;
