import { Address } from "@prisma/client";
import {
  addAddressRepo,
  CheckAddressExists,
  CheckAddressExistsById,
  deleteAddressRepo,
} from "./users.repository";
import { ErrorCode } from "../../exceptions/root";
import { ConflictErrorException } from "../../exceptions/conflict_error_exception";
import { NotFoundException } from "../../exceptions/not_found";

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
