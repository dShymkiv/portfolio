import Joi from 'joi';

export const addImageSchema = {
    body: Joi.object().keys({
        name: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'name' is not valid")),
        description: Joi.string().alphanum().min(2).max(255).trim().error(new Error("'description' is not valid")),
        comments: Joi.array().items(Joi.object()),
    }).required(),
};
