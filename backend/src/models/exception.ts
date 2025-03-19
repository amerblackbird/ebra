import {HTTPException} from 'hono/http-exception'

export class ExceptionModel extends HTTPException {

    constructor(code: string, readonly details?: any) {
        super(400, {message: code});
    }
}