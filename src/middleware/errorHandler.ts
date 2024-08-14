import { NextFunction, Response } from "express";
import { Req } from "../utils/types";
import HttpError from "../errors/httpError";

export default function errorHandler(
  err: HttpError | Error,
  _req: Req,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(err);
  }
  const status = err instanceof HttpError ? err.statusCode : 500;
  const message = err instanceof HttpError ? err.message : "Internal Server Error";

  console.error(err);

  res.status(status).json({
    status,
    message,
    ...((err instanceof HttpError && process.env.NODE_ENV === 'development')
      && { error: err.isOperational ? err.stack : null }
    )
  });
};