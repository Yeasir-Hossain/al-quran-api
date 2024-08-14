import jwt from 'jsonwebtoken';
import User from '../services/user/model';

/**
 * Decodes and verifies a JWT token to retrieve user information from the database.
 * @param {string} token - JWT token to decode and verify.
 * @returns {Promise<any>} Resolves with the user object decoded from the token if valid and found in the database; otherwise, resolves with null.
 * @throws {Error} If the token is invalid or decoding fails, throws an error with an error message.
 */
export default async function decodeAuthToken(token: string): Promise<any> {
    if (!token) throw new Error('Invalid token');
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
    if (!decoded) return null;
    const user = await User.findOne({ email: decoded.email });
    if (!user) return null;
    return user;
};