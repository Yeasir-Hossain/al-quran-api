import { Error } from "mongoose";
import { NextFunction, Response } from "express";
import { Req } from "../utils/types";
import HttpError from "../errors/httpError";
import logger from "../utils/logger";

export default function errorHandler(
  err: HttpError | Error | Error.ValidationError,
  _req: Req,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(err);
  }
  const hasValidationError = err instanceof Error.ValidationError;
  if (hasValidationError) {
    let errors: { [key: string]: string } = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    res.status(400).json({
      status: 400,
      message: "Validation Error",
      errors,
    });
  }
  const status = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof HttpError ? err.message : "Internal Server Error";

  logger.error(err);

  res.status(status).json({
    status,
    message,
    ...((err instanceof HttpError && process.env.NODE_ENV === 'development')
      && { error: err.isOperational ? err.stack : null }
    )
  });
};