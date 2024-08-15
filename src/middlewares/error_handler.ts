// import { Request, Response, NextFunction } from "express";
// import {
//   BadRequestsException,
//   // ErrorCode,
//   HttpException,
//   InternalException,
// } from "../utils/ApiError";
// import { ZodError } from "zod";

// export const errorHandler = (method: Function) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await method(req, res, next);
//     } catch (error: any) {
//       let exception: HttpException;
//       if (error instanceof HttpException) {
//         exception = error;
//       } else {
//         if (error instanceof ZodError) {
//           exception = new BadRequestsException(
//             "unprocessable entity",
//             // ErrorCode.UNPROCESSABLE_ENTITY,
//             error
//           );
//         } else {
//           exception = new InternalException(
//             "something went wrong!",
//             error
//             // ErrorCode.INTERNAL_EXCEPTION
//           );
//         }
//       }
//       console.log({ exception });
//       next(exception);
//     }
//   };
// };
