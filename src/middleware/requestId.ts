import { Response, NextFunction } from "express";
import { v4 as uuidV4 } from "uuid";
import { Req } from "../utils/types";

const ATTRIBUTE_NAME = "id";

interface MiddlwareProperties {
  generator?: () => string;
  headerName?: string;
  setHeader?: boolean;
};

export default function requestId({
  generator = uuidV4,
  headerName = "X-Request-Id",
  setHeader = true,
}: MiddlwareProperties = {}) {
  return (req: Req, res: Response, next: NextFunction) => {
    const oldId = req.get(headerName);
    const id = oldId ? oldId : generator();
    if (setHeader) res.set(headerName, id);
    req[ATTRIBUTE_NAME] = id;
    next();
  };
};