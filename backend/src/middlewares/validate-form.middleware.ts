import type {Context, Next} from 'hono';
import {ZodError, ZodSchema} from 'zod';
import {ExceptionModel} from "../models/exception";
import {ValidationUtils} from "../utils/validation";

/**
 * Middleware to validate input against a Zod schema.
 * @param schema - The Zod schema to validate against.
 * @returns Middleware function for input validation.
 */
export const validateFormMiddleware = (schema: ZodSchema) => {
    return async (c: Context, next: Next) => {
        try {
            const input = await c.req.json();
            const result = schema.safeParse(input);

            if (!result.success) {
                // Handle validation errors
                return ValidationUtils.handle(result.error);
            }

            // Attach validated data to the request body
            (c.req as any).body = result.data;
            await next();
        } catch (e) {

            if (e instanceof ZodError) {
                return ValidationUtils.handle(e);
            }
            if (e instanceof ExceptionModel) {
                throw e;
            }
            throw new ExceptionModel("500", {
                message: "Internal Server Error",
            });
        }
    };
};