import { Address } from "@prisma/client";
import { prismaClient } from "../../prisma";

export const addAddressRepo = async (data: Address, uid: number) => {
  try {
    const address = await prismaClient.address.create({
      data: {
        ...data,
        userId: uid,
      },
    });
    return address;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const CheckAddressExists = async (uid: number) => {
  return await prismaClient.address.findFirst({
    where: {
      userId: uid,
    },
  });
};

export const CheckAddressExistsById = async (id: number, uid: number) => {
  return await prismaClient.address.findUnique({
    where: {
      id,
      userId: uid,
    },
  });
};

export const deleteAddressRepo = async (address: Address) => {
  const deletedData = await prismaClient.address.delete({
    where: {
      id: address.id,
    },
  });
  return deletedData;
};
