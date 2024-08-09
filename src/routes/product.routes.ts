import { Router } from "express";
import { errorHandler } from "../error_handler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  searchProducts,
  updateProduct,
} from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const ProductsRoutes: Router = Router();

ProductsRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);

ProductsRoutes.patch(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);

ProductsRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);

ProductsRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listProducts)
);

ProductsRoutes.get("/search", [authMiddleware], errorHandler(searchProducts));

ProductsRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getProductById)
);

export default ProductsRoutes;
