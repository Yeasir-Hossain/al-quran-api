import { Response, NextFunction } from 'express';
import { Req } from "../utils/types";

/**
 * Middleware function to check if the authenticated user has the required role(s).
 * @param {string[]} roles - Array of roles allowed to access the route.
 * @returns {Function} Express middleware function that checks if the user's role matches any of the specified roles.
 * If authorized, passes control to the next middleware; otherwise, sends a 403 Forbidden response.
 */
export default function checkRole(roles: string[]): (req: Req, res: Response, next: NextFunction) => void {
    return (req: Req, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).send({ status: 401, message: 'Unauthorized' });
        if (!roles.includes(req?.user?.role)) return res.status(403).send({ status: 403, message: 'Forbidden Access' });
        return next();
    };
};