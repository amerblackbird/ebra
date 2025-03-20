import {z} from "zod";

/**
 * Schema for creating a new user.
 */
export const createTransactionDtoSchema = z.object({
    amount: z.number()
        .positive("Amount must be positive")
        .transform(value => Number(value.toFixed(2))),
});

export type CreateTransactionDto = z.infer<typeof createTransactionDtoSchema>;
