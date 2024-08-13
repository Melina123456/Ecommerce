import { Router } from "express";
import { errorHandler } from "../../error_handler";
import authMiddleware from "../../middlewares/auth";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddresses,
  listUsers,
  updateUser,
} from "./users.controller";
import adminMiddleware from "../../middlewares/admin";

const userRoutes: Router = Router();

userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));

userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress)
);

userRoutes.get("/address", [authMiddleware], errorHandler(listAddresses));

userRoutes.put("/update", [authMiddleware], errorHandler(updateUser));
userRoutes.patch(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(changeUserRole)
);
userRoutes.get("/", [authMiddleware, adminMiddleware], errorHandler(listUsers));
userRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getUserById)
);

export default userRoutes;
