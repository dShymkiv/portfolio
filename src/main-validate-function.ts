import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');

import { BadRequest } from '../errors/api-errors';

export interface IRequestSchema {
    body?: Joi.ObjectSchema
    query?: Joi.ObjectSchema
    params?: Joi.ObjectSchema
    headers?: Joi.ObjectSchema
}

export const getErrorMessage = (req: Request, schema: IRequestSchema) => {
    const valuesToValidate = {
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers
    };

    const result = Joi.validate(
        valuesToValidate,
        Joi.object().keys(schema as any).unknown()
    );

    let errorMessage = '';

    if (result.error) {
        errorMessage = result.error.details
            ? result.error.details.map(d => d.message).join('. ')
            : result.error.message;
    }

    // Replace "" with '' for to avoid `\` chars in JSON output
    return { message: errorMessage.replace(/"/g, "'"), value: result.value };
};

export const validate = (schema: IRequestSchema) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const { message, value } = getErrorMessage(req, schema);
        if (message) throw new BadRequest(message);

        // Pass default values specified in Joi schema to request object
        Object.assign(req, value);
        next();
    }
};
