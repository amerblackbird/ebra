import type {Context} from "hono";
import {AdminAuthService} from "../services/admin-auth.service";
import type {AuthDto} from "../schemas/auth.schema";


/**
 * AdminAuthController handles the HTTP requests related to admin authentication.
 */
export class AdminAuthController {
    constructor(
        private authService: AdminAuthService,
    ) {
    }

    /**
     * Handles the authorization of an admin user.
     * @param c - The context object containing the request and response.
     * @returns An object containing access and refresh tokens serialized as JSON.
     */
    async authorize(c: Context) {
        const body = await c.req.json<AuthDto>();
        const result = await this.authService.authorize(body);
        return c.json(result);
    }
}