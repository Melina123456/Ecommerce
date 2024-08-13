import { prismaClient } from "../../prisma";
import { compareSync, hashSync } from "bcrypt";
import { JWT_SECRET } from "../../secrets";
import * as jwt from "jsonwebtoken";

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
  const token = jwt.sign({ userId: uid }, JWT_SECRET);
  return { uid, name, token };
};

export const passwordMatches = async (
  password: string,
  storedPassword: string
) => {
  return compareSync(password, storedPassword);
};

export const meRepo = async (uid: number) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id: uid,
      },
    });
    return user;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};
