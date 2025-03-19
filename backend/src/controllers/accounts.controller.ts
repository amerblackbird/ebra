import type {AccountsService} from "../services/accounts.service";
import type {Context} from "hono";

import type {CreateUserDto} from "../schemas/users.schema";
import {serializeUser} from "../serializers/user.serializer";

export class AccountsController {
    constructor(
        private accountsService: AccountsService,
    ) {
    }

    async create(c: Context) {
        const body = await c.req.json<CreateUserDto>();
        const result = await this.accountsService.create(body);
        return c.json(serializeUser(result));
    }
}