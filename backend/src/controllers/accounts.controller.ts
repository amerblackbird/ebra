import type {AccountsService} from "../services/accounts.service";
import type {Context} from "hono";

import type {CreateUserDto} from "../schemas/users.schema";
import {serializeUser} from "../serializers/user.serializer";


/**
 * AccountsController handles the HTTP requests related to user accounts.
 */
export class AccountsController {
    constructor(
        private accountsService: AccountsService,
    ) {
    }

    /**
     * Handles the creation of a new user account.
     * @param c - The context object containing the request and response.
     * @returns The newly created user serialized as JSON.
     */
    async create(c: Context) {
        const body = await c.req.json<CreateUserDto>();
        const result = await this.accountsService.create(body);
        return c.json(serializeUser(result));
    }
}