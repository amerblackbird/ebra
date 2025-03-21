import {type Context, type Next} from "hono";
import {AuthUtils} from "../utils/auth";
import {ExceptionModel, UnauthorizedException} from "../models/exception";
import {JwtUtils} from "../utils/jwt";
import {AccountsService} from "../services/accounts.service";
import ERROR_CODES from "../constants/errors";

/**
 * Middleware to authenticate and authorize users based on JWT tokens.
 *
 * @param c - The context object provided by Hono.
 * @param next - The next middleware function in the stack.
 * @throws {UnauthorizedException} If the token is missing, expired, or invalid.
 * @throws {ExceptionModel} If the token is expired.
 */
export const authMiddleware = async (c: Context, next: Next) => {

    // Check if token is present
    const token = AuthUtils.getTokenFromHeader(c);
    if (!token) {
        throw new UnauthorizedException();
    }

    // Check if token is expired
    if (JwtUtils.isTokenExpired(token)) {
        throw new ExceptionModel(ERROR_CODES.TOKEN_EXPIRED, {
            message: 'Token expired',
        }, 401);
    }

    try {
        // Verify token
        const payload = await JwtUtils.verifyToken(token);
        if (!payload || !payload.role || payload.role !== 'admin' || !payload.sub) {
            throw new UnauthorizedException();
        }

        // find user
        const usersService = new AccountsService();
        const user = await usersService.findById(payload.sub);

        // check if user is admin
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException();
        }

        // set user in context
        c.set('user', user);

        // update
        await next();
    } catch (err) {
        if (err instanceof UnauthorizedException) {
            throw err;
        }
        throw new UnauthorizedException();
    }
};
