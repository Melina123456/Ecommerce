import { Router } from "express";
import { errorHandler } from "../../error_handler";
import adminMiddleware from "../../middlewares/admin";
import authMiddleware from "../../middlewares/auth";
import { productController } from "./product.controller";
import { productSchema } from "../../schema/product";

const ProductsRoutes: Router = Router();
const controller = new productController();

ProductsRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(controller.createProduct)
);

// ProductsRoutes.patch(
//   "/:id",
//   [authMiddleware, adminMiddleware],
//   errorHandler(updateProduct)
// );

// ProductsRoutes.delete(
//   "/:id",
//   [authMiddleware, adminMiddleware],
//   errorHandler(deleteProduct)
// );

// ProductsRoutes.get(
//   "/",
//   [authMiddleware, adminMiddleware],
//   errorHandler(listProducts)
// );

// ProductsRoutes.get("/search", [authMiddleware], errorHandler(searchProducts));

// ProductsRoutes.get(
//   "/:id",
//   [authMiddleware, adminMiddleware],
//   errorHandler(getProductById)
// );

export default ProductsRoutes;
