import { Address, Role } from "@prisma/client";
import {
  addAddressRepo,
  changeUserRoleRepo,
  CheckAddressExists,
  CheckAddressExistsById,
  CheckAddressExistsByIdOnly,
  checkIfAddressIdExists,
  deleteAddressRepo,
  findUser,
  getUserByIdRepo,
  listAddressesRepo,
  listUsersRepo,
  updateAddressRepo,
  updateUserRepo,
} from "./users.repository";
import {
  BadRequestsException,
  ConflictErrorException,
  ErrorCode,
  NotFoundException,
} from "../../exceptions/root";
import { updateUserDto } from "./dto/update_user_schema.dto";

export const addAddressService = async (data: Address, uid: number) => {
  const address = await CheckAddressExists(uid);
  if (address) {
    throw new ConflictErrorException(
      "Address is already there for you, you can update it ",
      ErrorCode.ADDRESS_ALREADY_EXISTS
    );
  }
  return await addAddressRepo(data, uid);
};

export const deleteAddressService = async (uid: number, id: number) => {
  const address = await CheckAddressExistsById(uid, id);
  console.log(address);
  if (!address) {
    throw new NotFoundException(
      "you have no address with this id to delete.",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
  return await deleteAddressRepo(address);
};

export const listAddressesService = async (uid: number) => {
  return await listAddressesRepo(uid);
};

export const listUsersService = async (skip: number, take: number) => {
  return await listUsersRepo(skip, take);
};

export const getUserByIdservice = async (uid: number) => {
  const user = await getUserByIdRepo(uid);
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  return user;
};

export const changeUserRoleService = async (id: number, role: Role) => {
  const user = await findUser(id);
  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  const updatedUser = await changeUserRoleRepo(id, role);
  return updatedUser;
};

export const updateUserservice = async (
  id: number,
  validatedData: updateUserDto
) => {
  const shippingAddresses = await checkIfAddressIdExists(
    validatedData.defaultShippingAddresses
  );
  if (shippingAddresses.userId !== id) {
    throw new BadRequestsException(
      "you can update your address only with your created address.",
      ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
    );
  }

  const billingAddresses = await checkIfAddressIdExists(
    validatedData.defaultBillingAddresses
  );
  if (billingAddresses.userId !== id) {
    throw new BadRequestsException(
      "you can update your address only with your created address.",
      ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
    );
  }
  return await updateUserRepo(id, validatedData);
};

export const updateAddressService = async (id: number, data: Address) => {
  await CheckAddressExistsByIdOnly(id);
  return await updateAddressRepo(id, data);
};
