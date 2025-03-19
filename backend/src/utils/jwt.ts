import * as jwt from 'hono/jwt'
import dayjs from "dayjs";
import env from "./env";

export class JwtUtils {

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

    static async generateTokens({userId, role}: { userId: string, role: string }) {
        const accessToken = await this.generateToken(userId, role, dayjs().add(1, 'day').toDate());
        const refreshToken = await this.generateToken(userId, role, dayjs().add(30, 'days').toDate());
        return {
            accessToken,
            refreshToken,
        }
    }

    static verifyToken(token: string) {
        return jwt.verify(token, env.SECRET_KEY);
    }
}