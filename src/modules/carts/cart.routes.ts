import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error_handler";
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from "./carts.controller";

const cartRoutes: Router = Router();

cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.patch("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));

export default cartRoutes;
