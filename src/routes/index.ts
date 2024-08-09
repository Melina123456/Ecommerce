import { Router } from "express";
import authRoutes from "./auth.routes";
import ProductsRoutes from "./product.routes";
import userRoutes from "./users";
import cartRoutes from "./carts.routes";
import orderRoutes from "./orders.routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", ProductsRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/carts", cartRoutes);
rootRouter.use("/orders", orderRoutes);

export default rootRouter;
