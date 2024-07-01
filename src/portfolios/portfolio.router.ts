import { Router } from 'express';

import { authMiddleware } from '../auth/auth.middlewares';
import { portfolioController } from './portfolio.controller';
import { validate } from '../main-validate-function';
import { headersSchema } from '../auth/auth.schemas';
import { checkPortfolioIdParamSchema, createPortfolioSchema } from './portfolio.schemas';

const router = Router();

router.use(
    authMiddleware.validateToken,
    validate(headersSchema),
);
router.get('/',
    portfolioController.getPortfoliosByUserProfileId,
);

router.get('/:portfolioId',
    validate(checkPortfolioIdParamSchema),
    portfolioController.getPortfolioById,
);

router.post('/',
    validate(createPortfolioSchema),
    portfolioController.createPortfolio
);

router.delete('/:portfolioId',
    validate(checkPortfolioIdParamSchema),
    portfolioController.deletePortfolioById
);

export const portfolioRouter = router;
