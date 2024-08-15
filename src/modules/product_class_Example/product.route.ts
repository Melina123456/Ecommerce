import { Router } from "express";
import adminMiddleware from "../../middlewares/admin";
import authMiddleware from "../../middlewares/auth";
import { productController } from "./product.controller";

const ProductsRoutes: Router = Router();
const controller = new productController();

ProductsRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  controller.createProduct
);

export default ProductsRoutes;
