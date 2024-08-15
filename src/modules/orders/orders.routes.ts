import { Router } from "express";
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

orderRoutes.post("/", [authMiddleware], createOrder);
orderRoutes.get("/", [authMiddleware], listOrders);
orderRoutes.patch("/:id/cancel", [authMiddleware], cancelOrder);
orderRoutes.get("/index", [authMiddleware, adminMiddleware], listAllOrders);
orderRoutes.patch(
  "/:id/status",
  [authMiddleware, adminMiddleware],
  changeStatus
);
orderRoutes.get("/get", [authMiddleware], getOrderOfUser);
orderRoutes.get("/:id", [authMiddleware], getOrderById);

export default orderRoutes;
