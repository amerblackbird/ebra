import type {Context} from "hono";
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import VALIDATION_ERROR_CODES from "../constants/validation";
import type {z} from "zod";


/**
 * Error handler middleware for handling exceptions and errors.
 * @param err - The error object thrown.
 * @param c - The Hono context object.
 * @returns JSON response with error code and details.
 */
export function errorHandler(err: any, c: Context) {
    let statusCode = 400;
    let code = ERROR_CODES.ERROR_SERVER_ERROR;
    let details = undefined;
    try {
        let message = undefined
        if (err instanceof ExceptionModel) {
            statusCode = err.status;
            message = err.message.trim();
            details = err.details;
        }

        if (err instanceof Error) {
            message = err.message.trim();
        }

        // CHECK: if error message is exists inside ERROR_CODES
        if (message && Object.keys(ERROR_CODES).includes(message)) {
            code = ERROR_CODES[message as never];
        }
    } catch (e) {
        console.error(e);
    }

    // Extract details from error object

    c.status(statusCode as never);
    return c.json({
        code,
        details
    });
}


