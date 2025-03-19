import {z, ZodError} from 'zod';
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import VALIDATION_ERROR_CODES from "../constants/validation";

/**
 * Handles validation errors by throwing an appropriate exception.
 *
 * @param error - The error object to handle.
 * @throws {ExceptionModel} - Throws an exception with details about the validation error.
 */
export const handleValidationError = (error: any) => {
    if (error instanceof ZodError) {
        const invalidFields = error.errors.map(err => {

            const path = err.path.join('.');
            return {
                field: path,
                reason: err.message.toLowerCase(),
                code: resolveErrorCode(path, err.code),
            }
        });
        throw new ExceptionModel(ERROR_CODES.ERROR_INVALID_REQUEST, {
            invalid_fields: invalidFields,
        });
    }
    throw new ExceptionModel("500", {
        message: error.message,
    });
};

export function resolveErrorCode(path: string, code: keyof typeof z.ZodIssueCode) {
    // Add custom fields
    if (path == "password" && code == z.ZodIssueCode.invalid_string) {
        return VALIDATION_ERROR_CODES.INVALID_PASSWORD;
    }
    return VALIDATION_ERROR_CODES[code] || "INVALID_INPUT";
}