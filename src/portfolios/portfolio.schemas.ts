import Joi from 'joi';

export const checkPortfolioIdParamSchema = {
    params: Joi.object().keys({
        portfolioId: Joi.number().required(),
    }),
};

export const createPortfolioSchema = {
    body: Joi.object().keys({
        name: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'name' is not valid")),
        description: Joi.string().alphanum().min(2).max(64).trim().error(new Error("'description' is not valid")),
        user: Joi.object(),
        images: Joi.object()
    }).required(),
};
