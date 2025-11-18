"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        var _a, _b;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const isHttp = exception instanceof common_1.HttpException;
        const status = isHttp
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";
        if (exception instanceof common_1.BadRequestException) {
            message = "Não foi possível validar os dados recebidos.";
            this.logger.warn({
                msg: 'Validation failed',
                path: request.url,
                bodySize: request.headers['content-length'] || null,
                detail: exception.getResponse(),
            });
        }
        else if (isHttp) {
            const res = exception.getResponse();
            message = typeof res === "string"
                ? res
                : res['message'] || message;
            this.logger.error(`HTTP Exception on ${request.method} ${request.url}`, (_a = exception.stack) !== null && _a !== void 0 ? _a : JSON.stringify(exception));
        }
        else {
            this.logger.error(`Unhandled exception on ${request.method} ${request.url}`, (_b = exception.stack) !== null && _b !== void 0 ? _b : JSON.stringify(exception));
        }
        response.status(status).json({
            statusCode: status,
            error: message
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map