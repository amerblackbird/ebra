import type {Context} from "hono";

export class AuthUtils {
    static getTokenFromHeader(c: Context) {
        const auth = c.req.header('Authorization')
        if (auth && auth.startsWith('Bearer ')) {
            return auth.substring(7).trim()
        }
        return null
    }


}