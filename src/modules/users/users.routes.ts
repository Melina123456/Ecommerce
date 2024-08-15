import { Router } from "express";

import authMiddleware from "../../middlewares/auth";
import {
  addAddress,
  changeUserRole,
  deleteAddress,
  getUserById,
  listAddresses,
  listUsers,
  updateAddress,
  updateUser,
} from "./users.controller";
import adminMiddleware from "../../middlewares/admin";

const userRoutes: Router = Router();

userRoutes.post("/address", [authMiddleware], addAddress);

userRoutes.delete("/address/:id", [authMiddleware], deleteAddress);

userRoutes.get("/address", [authMiddleware], listAddresses);

userRoutes.put("/update", [authMiddleware], updateUser);
userRoutes.patch(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  changeUserRole
);
userRoutes.get("/", [authMiddleware, adminMiddleware], listUsers);
userRoutes.get("/:id", [authMiddleware, adminMiddleware], getUserById);
userRoutes.patch(
  "/update/:id",
  [authMiddleware, adminMiddleware],
  updateAddress
);

export default userRoutes;
