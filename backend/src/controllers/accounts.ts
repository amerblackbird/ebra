import type {AccountsService} from "../services/accounts";
import type {Context} from "hono";

import type {CreateUserDto} from "../schemas/usersSchema";

export class AccountsController {
    constructor(
        private accountsService: AccountsService,
    ) {
    }

    async create(c: Context) {
        const body = await c.req.json<CreateUserDto>();
        const result = await this.accountsService.create(body);
        return c.json(result);
    }
}