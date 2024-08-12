import { ErrorCode, HttpException } from "./root";

export class ConflictErrorException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 409, null);
  }
}
