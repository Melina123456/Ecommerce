import { Router } from "express";
import { errorHandler } from "../../middlewares/error_handler";
import authMiddleware from "../../middlewares/auth";
import { signup, login, me } from "./auth.controller";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));

authRoutes.post("/login", errorHandler(login));

authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
