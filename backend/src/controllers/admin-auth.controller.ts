import type {Context} from "hono";
import {AdminAuthService} from "../services/admin-auth.service";
import type {AuthDto} from "../schemas/auth.schema";

export class AdminAuthController {
    constructor(
        private authService: AdminAuthService,
    ) {
    }

    async authorize(c: Context) {
        const body = await c.req.json<AuthDto>();
        const result = await this.authService.authorize(body);
        return c.json(result);
    }
}