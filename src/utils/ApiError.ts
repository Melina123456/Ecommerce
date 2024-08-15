export class HttpException extends Error {
  message: string;
  statusCode: number;
  errors: any;
  constructor(message: string, statusCode: number, errors: any) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    console.log("Error: ", message, statusCode, errors);
  }
}

export class BadRequestsException extends HttpException {
  constructor(message: string, errors?: any) {
    super(message, 400, errors);
  }
}

export class ConflictErrorException extends HttpException {
  constructor(message: string) {
    super(message, 409, null);
  }
}

export class PreConditionFailedException extends HttpException {
  constructor(message: string, errors?: any) {
    super(message, 412, errors);
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
