import type {TransactionsService} from "../services/transactions.service";
import type {Context} from "hono";
import {serializeTransaction} from "../serializers/transaction.serializer";
import type {CreateTransactionDto} from "../schemas/transactions.schema";
import type {UserModel} from "../db/schema";

/**
 * Controller for handling transaction-related operations.
 */
export class TransactionsController {
    constructor(
        private readonly transactionsService: TransactionsService,
    ) {
    }

    /**
     * Handles the top-up operation for a user account.
     * @param {Context} c - The context object containing the request and response.
     * @returns {Promise<Context>} - The response context with the serialized transaction.
     */
    async topUp(c: Context) {
        const user = c.get('user') as UserModel;

        const body = await c.req.json<CreateTransactionDto>();
        const userId = c.req.param('id');
        const result = await this.transactionsService.topUp(user, {userId, ...body});
        return c.json(serializeTransaction(result.transaction, {
            wallet: result.wallet
        }));
    }


    /**
     * Handles the charge operation for a user account.
     * @param {Context} c - The context object containing the request and response.
     * @returns {Promise<Context>} - The response context with the serialized transaction.
     */
    async charge(c: Context) {
        const user = c.get('user') as UserModel;

        const body = await c.req.json<CreateTransactionDto>();
        const userId = c.req.param('id');

        const result = await this.transactionsService.charge(user, {userId, ...body});
        return c.json(serializeTransaction(result.transaction, {
            wallet: result.wallet
        }));
    }
}