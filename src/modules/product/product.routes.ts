import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  searchProducts,
  updateProduct,
} from "./product.controller";
import authMiddleware from "../../middlewares/auth";
import adminMiddleware from "../../middlewares/admin";

const ProductsRoutes: Router = Router();

ProductsRoutes.post("/", [authMiddleware, adminMiddleware], createProduct);

ProductsRoutes.patch(
  "/update/:id",
  [authMiddleware, adminMiddleware],
  updateProduct
);

ProductsRoutes.delete("/:id", [authMiddleware, adminMiddleware], deleteProduct);

ProductsRoutes.get("/", [authMiddleware, adminMiddleware], listProducts);

ProductsRoutes.get("/search", [authMiddleware], searchProducts);

ProductsRoutes.get("/:id", [authMiddleware, adminMiddleware], getProductById);

export default ProductsRoutes;
