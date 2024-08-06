import { Router } from "express";
import authRoutes from "./auth.routes";
import ProductsRoutes from "./product.routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", ProductsRoutes);

export default rootRouter;
