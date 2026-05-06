import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorType } from "./error-types";

export class AppException extends HttpException {
  constructor(type: ErrorType, message: string, status: HttpStatus) {
    super(
      {
        statusCode: status,
        type,
        message,
      },
      status,
    );
  }
}
