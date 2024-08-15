import { User } from "@prisma/client";
import {
  ifUserExists,
  loginRepo,
  passwordMatches,
  signupRepo,
} from "./auth.repository";
import {
  BadRequestsException,
  ErrorCode,
  NotFoundException,
} from "../../exceptions/root";

export const signupService = async (data: User) => {
  const user = await ifUserExists(data.email);
  if (user) {
    throw new BadRequestsException(
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }
  return await signupRepo(data.name, data.email, data.password);
};

export const loginService = async (email: string, password: string) => {
  const user = await ifUserExists(email);
  if (!user) {
    throw new NotFoundException("user not found", ErrorCode.USER_NOT_FOUND);
  }
  const passwordOk = await passwordMatches(password, user.password);
  if (!passwordOk) {
    throw new BadRequestsException(
      "incorrect credentials",
      ErrorCode.INCORRECT_CREDENTIALS
    );
  }
  return await loginRepo(user.id, user.name);
};
