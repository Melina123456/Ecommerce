import { Router } from "express";
// import { errorHandler } from "../../middlewares/error_handler";
import authMiddleware from "../../middlewares/auth";
import { signup, login, me, refreshAccessToken } from "./auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", signup);

authRoutes.post("/login", login);

authRoutes.post("/refresh-token", refreshAccessToken);

authRoutes.get("/me", [authMiddleware], me);

export default authRoutes;
