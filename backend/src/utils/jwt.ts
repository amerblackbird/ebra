import * as jwt from 'hono/jwt'
import dayjs from "dayjs";
import env from "./env";

/**
 * Utility class for handling JWT operations.
 */
export class JwtUtils {

    /**
     * Generates a JWT token.
     * @param userId - The user ID to include in the token payload.
     * @param role - The role of the user.
     * @param expires - The expiration date of the token.
     * @returns The generated JWT token.
     */
    static generateToken(
        userId: string,
        role: string,
        expires: Date,
    ) {
        const payload = {
            sub: userId.toString(),
            exp: dayjs(expires).unix(),
            iat: dayjs().unix(),
            role,
        }
        return jwt.sign(payload, env.SECRET_KEY)
    }


    /**
     * Generates access and refresh tokens for a user.
     * @param userId - The user ID to include in the token payload.
     * @param role - The role of the user.
     * @returns An object containing the access and refresh tokens.
     */
    static async generateTokens({userId, role}: { userId: string, role: string }) {
        const accessToken = await this.generateToken(userId, role, dayjs().add(1, 'day').toDate());
        const refreshToken = await this.generateToken(userId, role, dayjs().add(30, 'days').toDate());
        return {
            accessToken,
            refreshToken,
        }
    }

    /**
     * Checks if a JWT token is expired.
     * @param token - The JWT token to check.
     * @returns True if the token is expired, otherwise false.
     */
    static isTokenExpired(token: string): boolean {
        const decoded = jwt.decode(token);
        const currentTime = dayjs().unix();
        return decoded.payload.exp !== undefined && decoded.payload.exp < currentTime;
    }

    /**
     * Verifies a JWT token.
     * @param token - The JWT token to verify.
     * @returns The decoded token payload if verification is successful.
     */
    static verifyToken(token: string): Promise<any> {
        return jwt.verify(token, env.SECRET_KEY) ;
    }
}