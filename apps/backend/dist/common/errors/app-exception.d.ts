import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorType } from "./error-types";
export declare class AppException extends HttpException {
    constructor(type: ErrorType, message: string, status: HttpStatus);
}
//# sourceMappingURL=app-exception.d.ts.map