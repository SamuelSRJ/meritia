"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
const common_1 = require("@nestjs/common");
class AppException extends common_1.HttpException {
    constructor(type, message, status) {
        super({
            statusCode: status,
            type,
            message,
        }, status);
    }
}
exports.AppException = AppException;
//# sourceMappingURL=app-exception.js.map