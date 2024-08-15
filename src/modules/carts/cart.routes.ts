import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
// import { errorHandler } from "../../middlewares/error_handler";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "./carts.controller";

const cartRoutes: Router = Router();

cartRoutes.post("/", [authMiddleware], addItemToCart);
cartRoutes.delete("/:id", [authMiddleware], deleteItemFromCart);
cartRoutes.patch("/:id", [authMiddleware], changeQuantity);
cartRoutes.get("/", [authMiddleware], getCart);

export default cartRoutes;
