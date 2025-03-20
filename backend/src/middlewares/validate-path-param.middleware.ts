import type {Context, Next} from 'hono';
import {z, ZodError} from 'zod';
import {ValidationUtils} from "../utils/validation";
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";

export const uuidSchema = z.string().uuid();

export const validatePathParamMiddleware = (paramName: string) => {
    return async (c: Context, next: Next) => {
        try {
            const paramValue = c.req.param(paramName);
            const result = uuidSchema.safeParse(paramValue);

            if (!result.success) {
                ValidationUtils.handle(result.error, paramName);
            }

            await next();
        } catch (e) {
            if (e instanceof ZodError) {
                return ValidationUtils.handle(e);
            }
            if (e instanceof ExceptionModel) {
                throw e;
            }
            throw new ExceptionModel(ERROR_CODES.INTERNAL_SERVER_ERROR, {
                message: "Internal Server Error",
            }, 500);
        }
    };
};