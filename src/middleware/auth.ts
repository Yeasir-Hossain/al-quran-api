import { NextFunction, Response } from "express";
import { Req } from "../utils/types";
import decodeAuthToken from "../utils/decodeAuthToken";

/**
 * Middleware function to authenticate user using JWT token from cookies or authorization header.
 * @param {Req} req - Express request object extended with user information after decoding token.
 * @param {Response} res - Express response object to handle HTTP response.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Promise<any>} Resolves if authentication succeeds and passes control to the next middleware.
 * @throws {Error} If authentication fails, sends a 401 Unauthorized response with an error message.
 */
export default async function auth(req: Req, res: Response, next: NextFunction): Promise<any> {
  try {
    const token = req?.cookies?.[process.env.COOKIE_KEY!] || req?.headers?.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ status: 401, message: "Unauthorized" });
    const decoded = await decodeAuthToken(token);
    if (!decoded) return res.status(401).send({ status: 401, message: "Unauthorized" });
    if (decoded?.status !== "active") {
      res.clearCookie(process.env.COOKIE_KEY!, {
        httpOnly: true,
        secure: process.env.MODE === "development" ? false : true,
        sameSite: process.env.MODE === "development" ? "none" : "strict",
        priority: "high",
        domain: process.env.OWN_DOMAIN!,
        expires: new Date(Date.now())
      });
      return res.status(401).send({ status: 401, message: "Unauthorized, User is not active" });
    }
    req.user = decoded;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ status: 401, message: "Unauthorized" });
  }
}
