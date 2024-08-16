import { User } from "@prisma/client";
import {
  extractPayload,
  findUserByPayloadData,
  ifUserExists,
  loginRepo,
  passwordMatches,
  refreshAccessTokenRepo,
  signupRepo,
  updataTokenInDbRepo,
} from "./auth.repository";
import {
  BadRequestsException,
  NotFoundException,
  UnauthorizedException,
} from "../../utils/ApiError";
import { prismaClient } from "../../prisma";

export const signupService = async (data: User) => {
  const user = await ifUserExists(data.email);
  if (user) {
    throw new BadRequestsException("User already exists");
  }
  return await signupRepo(data.name, data.email, data.password);
};

export const loginService = async (email: string, password: string) => {
  const user = await ifUserExists(email);
  if (!user) {
    throw new NotFoundException("user not found");
  }
  const passwordOk = await passwordMatches(password, user.password);
  if (!passwordOk) {
    throw new BadRequestsException("incorrect credentials");
  }
  const data = await loginRepo(user.id, user.name);
  await updataTokenInDbRepo(user.id, data);
  return data;
};

export const refreshAccessTokenService = async (token: string) => {
  const payload = await extractPayload(token);
  if (!payload) {
    throw new UnauthorizedException("invalid or expired token.");
  }
  const user = await findUserByPayloadData(payload.userId);
  if (!user) {
    throw new UnauthorizedException("unauthorized, user not found by token.");
  }
  return await refreshAccessTokenRepo(user.id, user.name);
};
