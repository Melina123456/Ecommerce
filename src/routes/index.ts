import { Router } from "express";
import userRoutes from "./users";
import orderRoutes from "../modules/orders/orders.routes";
import ProductsRoutes from "../modules/product/product.route";
import cartRoutes from "../modules/carts/cart.routes";
import authRoutes from "../modules/auth/auth.routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", ProductsRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/carts", cartRoutes);
rootRouter.use("/orders", orderRoutes);

export default rootRouter;
