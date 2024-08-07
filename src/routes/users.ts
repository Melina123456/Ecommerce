import { Router } from "express";
import { errorHandler } from "../error_handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import { addAddress, deleteAddress, listAddresses } from "../controllers/users";

const userRoutes: Router = Router();

userRoutes.post(
  "/address",
  [authMiddleware, adminMiddleware],
  errorHandler(addAddress)
);

userRoutes.delete(
  "/address/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteAddress)
);

userRoutes.get(
  "/address",
  [authMiddleware, adminMiddleware],
  errorHandler(listAddresses)
);

export default userRoutes;
