import {ResponseCodesEnum} from "./response-codes.enum";

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class BadRequest extends ApiError {
    constructor(message: string) {
        super(message, ResponseCodesEnum.BAD_REQUEST);
    }
}

export class Conflict extends ApiError {
    constructor(message: string) {
        super(message, ResponseCodesEnum.CONFLICT);
    }
}

export class Forbidden extends ApiError {
    constructor(message: string) {
        super(message, ResponseCodesEnum.FORBIDDEN);
    }
}

export class NotFound extends ApiError {
    constructor(message: string) {
        super(message, ResponseCodesEnum.NOT_FOUND);
    }
}

export class ServerError extends ApiError {
    constructor(message: string) {
        super(message, ResponseCodesEnum.SERVER_ERROR);
    }
}

export class Unauthorized extends ApiError {
    constructor(message: string) {
        super(message, ResponseCodesEnum.UNAUTHORIZED);
    }
}
