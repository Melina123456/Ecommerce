import { Router } from "express";
import { errorHandler } from "../error_handler";
import authMiddleware from "../middlewares/auth";
import {
  addAddress,
  deleteAddress,
  listAddresses,
  updateUser,
} from "../controllers/users";

const userRoutes: Router = Router();

userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));

userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);

userRoutes.get("/address", [authMiddleware], errorHandler(listAddresses));

userRoutes.put("/update", [authMiddleware], errorHandler(updateUser));

export default userRoutes;
