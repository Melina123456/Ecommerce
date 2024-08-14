import { Address, Role } from "@prisma/client";
import { prismaClient } from "../../prisma";
import { updateUserDto } from "./dto/update_user_schema.dto";

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

export const CheckAddressExistsByIdOnly = async (id: number) => {
  return await prismaClient.address.findUnique({
    where: {
      id,
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

export const listAddressesRepo = async (uid: number) => {
  const address = await prismaClient.address.findFirst({
    where: {
      userId: uid,
    },
  });
  console.log(address);
  return address;
};

export const listUsersRepo = async (skip: number, take: number) => {
  try {
    const users = await prismaClient.user.findMany({
      skip,
      take: take || 5,
    });
    return users;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const findUser = async (id: number) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

export const getUserByIdRepo = async (uid: number) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id: uid,
      },
      include: {
        addresses: true,
      },
    });
    return user;
  } catch (error) {
    console.log("controller", error);
    throw error;
  }
};

export const changeUserRoleRepo = async (id: number, role: Role) => {
  try {
    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return user;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};

export const updateUserRepo = async (
  id: number,
  validatedData: updateUserDto
) => {
  const updateUser = await prismaClient.user.update({
    where: {
      id,
    },
    data: validatedData,
  });
  return updateUser;
};

export const checkIfAddressIdExists = async (AddressId: number) => {
  return await prismaClient.address.findFirstOrThrow({
    where: {
      id: AddressId,
    },
  });
};

export const updateAddressRepo = async (id: number, data: Address) => {
  try {
    const updatedAddress = await prismaClient.address.update({
      where: {
        id,
      },
      data,
    });
    return updatedAddress;
  } catch (error) {
    console.log("repo", error);
    throw error;
  }
};
