import { prismaClient } from "../../prisma";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  JWT_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../../config/secrets";
import { tokenupdate } from "./dto/token_update.dto";

export const signupRepo = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });
    return user;
  } catch (error) {
    console.log("repo", error);
    return error;
  }
};

export const ifUserExists = async (email: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
};

export const loginRepo = async (uid: number, name: string) => {
  const token = jwt.sign({ userId: uid, name: name }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({ userId: uid }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return { uid, name, token, refreshToken };
};

export const passwordMatches = async (
  password: string,
  storedPassword: string
) => {
  return compareSync(password, storedPassword);
};

export const updataTokenInDbRepo = async (id: number, data: tokenupdate) => {
  await prismaClient.token.upsert({
    where: { userId: id },
    update: {
      refreshToken: data.refreshToken,
    },
    create: {
      refreshToken: data.refreshToken,
      user: { connect: { id } },
    },
  });
};

export const extractPayload = async (token: string) => {
  const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: number };
  return payload;
};

export const findUserByPayloadData = async (id: number) => {
  const user = await prismaClient.user.findFirst({
    where: { id },
  });
  return user;
};

export const refreshAccessTokenRepo = async (id: number, name: string) => {
  const token = jwt.sign({ userId: id, name: name }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  return token;
};
