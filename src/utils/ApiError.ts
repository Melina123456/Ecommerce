//message, status code, error codes,  error

export class HttpException extends Error {
  message: string;
  // errorCode: any;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    // errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    // this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
    console.log(
      "Error: ",
      message,
      // errorCode,
      statusCode,
      errors
    );
  }
}

// export enum ErrorCode {
//   USER_NOT_FOUND = 1001,
//   USER_ALREADY_EXISTS = 1002,
//   INCORRECT_CREDENTIALS = 1003,
//   ADDRESS_NOT_FOUND = 1004,
//   ADDRESS_DOES_NOT_BELONG_TO_USER = 1005,
//   ADDRESS_ALREADY_EXISTS = 1006,
//   NOT_ADMIN = 1007,
//   UNPROCESSABLE_ENTITY = 2001,
//   INTERNAL_EXCEPTION = 3001,
//   UNAUTHORIZED = 401,
//   PRODUCT_NOT_FOUND = 4001,
//   PRODUCT_DOES_NOT_BELONG_TO_USER = 4002,
//   PRODUCT_NAME_EXISTS = 4003,
//   ORDER_NOT_FOUND = 5001,
//   ORDER_NOT_FOUND_here = 5001,
//   ORDER_ALREADY_CANCELLED = 5002,
//   ORDER_DOES_NOT_BELONG_TO_USER = 5003,
//   CARTITEM_DOES_NOT_BELONG_TO_USER = 6000,
//   CARTITEM_NOT_FOUND = 6001,
//   DATA_NOT_FOUND = 6002,
// }

export class BadRequestsException extends HttpException {
  constructor(
    message: string,
    // errorCode: ErrorCode,
    errors?: any
  ) {
    super(message, 400, errors);
  }
}

export class ConflictErrorException extends HttpException {
  constructor(
    message: string
    // errorCode: ErrorCode
  ) {
    super(message, 409, null);
  }
}

export class InternalException extends HttpException {
  constructor(message: string, errors: any) {
    super(message, 500, errors);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404, null);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, errors?: any) {
    super(message, 401, errors);
  }
}

export class UnprocessableEntity extends HttpException {
  constructor(error: any, message: string) {
    super(message, 422, error);
  }
}
