import type {TransactionsService} from "../services/transactions.service";
import type {Context} from "hono";
import {serializeTransaction} from "../serializers/transaction.serializer";
import type {CreateTransactionDto} from "../schemas/transactions.schema";

export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
    ) {
    }

    async topUp(c: Context) {
        const body = await c.req.json<CreateTransactionDto>();
        const userId = c.req.param('id');
        const result = await this.transactionsService.topUp({userId, ...body});
        return c.json(serializeTransaction(result.transaction, {
            wallet: result.wallet
        }));
    }

    async charge(c: Context) {
        const body = await c.req.json<CreateTransactionDto>();
        const userId = c.req.param('id');

        const result = await this.transactionsService.charge({userId, ...body});
        return c.json(serializeTransaction(result.transaction, {
            wallet: result.wallet
        }));
    }
}