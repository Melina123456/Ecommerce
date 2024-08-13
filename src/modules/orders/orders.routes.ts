import { Router } from "express";
import { errorHandler } from "../../error_handler";
import authMiddleware from "../../middlewares/auth";
import {
  cancelOrder,
  changeStatus,
  createOrder,
  getOrderById,
  getOrderOfUser,
  listAllOrders,
  listOrders,
} from "./orders.controller";
import adminMiddleware from "../../middlewares/admin";

const orderRoutes: Router = Router();

orderRoutes.post("/", [authMiddleware], errorHandler(createOrder));
orderRoutes.get("/", [authMiddleware], errorHandler(listOrders));
orderRoutes.patch("/:id/cancel", [authMiddleware], errorHandler(cancelOrder));
orderRoutes.get(
  "/index",
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders)
);
orderRoutes.patch(
  "/:id/status",
  [authMiddleware, adminMiddleware],
  errorHandler(changeStatus)
);
orderRoutes.get("/get", [authMiddleware], errorHandler(getOrderOfUser));
orderRoutes.get("/:id", [authMiddleware], errorHandler(getOrderById));

export default orderRoutes;
