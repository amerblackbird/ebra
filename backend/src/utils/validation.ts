import {z, ZodError} from 'zod';
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import VALIDATION_ERROR_CODES from "../constants/validation";

export class ValidationUtils {
    /**
     * Handles validation errors by throwing an appropriate exception.
     *
     * @param error - The error object to handle.
     * @param paramName - The name of the parameter that caused the validation error.
     * @throws {ExceptionModel} - Throws an exception with details about the validation error.
     */
    static handle(error: any, paramName?: string) {
        if (error instanceof ZodError) {
            const invalidFields = error.errors.map(err => {
                const path = paramName ?? err.path.join('.');
                return {
                    field: path,
                    reason: err.message.toLowerCase(),
                    code: this.resolve(path, err.code),
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

    /**
     * Resolves the appropriate error code based on the validation path and code.
     *
     * @param {string} path - The path of the field that caused the validation error.
     * @param {keyof typeof z.ZodIssueCode} code - The Zod issue code for the validation error.
     * @returns {string} The resolved error code.
     */
    static resolve(path: string, code: keyof typeof z.ZodIssueCode): string {
        // Add custom fields
        if (path == "password" && code == z.ZodIssueCode.invalid_string) {
            return VALIDATION_ERROR_CODES.INVALID_PASSWORD;
        }
        if (path == "id" && code == z.ZodIssueCode.invalid_string) {
            return VALIDATION_ERROR_CODES.INVALID_ID;
        }
        return VALIDATION_ERROR_CODES[code] || "INVALID_INPUT";
    }
}

