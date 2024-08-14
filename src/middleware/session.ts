import { NextFunction, Response } from "express";
import { v4 as uuid } from "uuid";
import { Req } from "../utils/types";

/**
 * Middleware function to manage session tokens using cookies and Redis storage.
 * Checks for an existing session token in cookies. If not found, generates a new token,
 * stores it in cookies and Redis, and attaches it to the request object for subsequent requests.
 * @param {Req} req - Express request object extended with session information.
 * @param {Response} res - Express response object to set session cookie and handle HTTP responses.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} Resolves if session handling succeeds and passes control to the next middleware.
 * @throws {Error} If session handling fails, sends a 500 Internal Server Error response with an error message.
 */
export default async function session(req: Req, res: Response, next: NextFunction): Promise<any> {
  try {
    const sessionToken = req?.cookies?.[process.env.SESSION_COOKIE_KEY!];
    if (sessionToken) {
      req.session = sessionToken;
      return next();
    }
    const token = uuid();
    res.cookie(process.env.SESSION_COOKIE_KEY!, token, {
      httpOnly: true,
      secure: process.env.MODE === "development" ? false : true,
      sameSite: process.env.MODE === "development" ? "none" : "strict",
      priority: "high",
      domain: process.env.OWN_DOMAIN!,
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
    });
    req.session = token;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
}
