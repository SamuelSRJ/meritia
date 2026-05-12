import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any = "Internal server error";

    if (exception instanceof BadRequestException) {
      message = "Não foi possível validar os dados recebidos.";

      this.logger.warn({
        msg: "Validation failed",
        path: request.url,
        bodySize: (request.headers as any)["content-length"] || null,
        detail: exception.getResponse(),
      });
    } else if (isHttp) {
      const res = exception.getResponse() as any;
      message = typeof res === "string" ? res : res["message"] || message;

      this.logger.error(
        `HTTP Exception on ${request.method} ${request.url}`,
        exception.stack ?? JSON.stringify(exception),
      );
    } else {
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}`,
        exception.stack ?? JSON.stringify(exception),
      );
    }

    response.status(status).json({
      statusCode: status,
      error: message,
    });
  }
}
