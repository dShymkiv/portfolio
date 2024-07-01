import Joi from 'joi';

import {regExp} from '../../config/regexp';

export const loginUserSchema = {
    body: Joi.object().keys({
        email: Joi.string().regex(regExp.EMAIL).lowercase().trim().error(new Error("'email' is not valid")),
        password: Joi.string().regex(regExp.PASSWORD).error(new Error("Please enter valid data")),
    }).required(),
};

export const headersSchema = {
    headers: Joi.object().keys({
        authorization: Joi.string().min(2).max(256).error(new Error("Invalid token")),
    }).unknown(),
};

export const signUpUserProfileSchema = {
    body: Joi.object().keys({
        firstName: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'firstName' is not valid")),
        lastName: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'lastName' is not valid")),
        age: Joi.number().integer().min(1).max(120).error(new Error("'age' is not valid")),

        email: Joi.string().regex(regExp.EMAIL).lowercase().trim().required().error(new Error("'email' is not valid")),
        phone: Joi.string().regex(regExp.PHONE).lowercase().trim().required().error(new Error("'phone' is not valid")),
        password: Joi.string().regex(regExp.PASSWORD).required().error(new Error("Please enter valid data")),
    })
};
