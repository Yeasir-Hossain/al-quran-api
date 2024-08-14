import { Response, NextFunction } from "express";
import { Req } from "./types";

export const asyncHandler = (fn: Function) =>
  (req: Req, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);