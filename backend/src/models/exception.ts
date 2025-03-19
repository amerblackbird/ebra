import {HTTPException} from 'hono/http-exception'
import type {ContentfulStatusCode} from "hono/dist/types/utils/http-status";
import ERROR_CODES from "../constants/errors";

export class ExceptionModel extends HTTPException {

    constructor(code: string, readonly details?: any, readonly statusCode: ContentfulStatusCode = 400) {
        super(statusCode, {message: code});
    }
}

export class UnauthorizedException extends ExceptionModel {
    constructor() {
        super(ERROR_CODES.UNAUTHORIZED_ACCESS, null, 401);
    }
}