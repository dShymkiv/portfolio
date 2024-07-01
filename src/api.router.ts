import { Router } from 'express';

import { authRouter } from './auth/auth.router';
import { imageRouter } from './images/image.router';
import { portfolioRouter } from './portfolios/portfolio.router';
import { userProfileRouter } from './users/user-profile.router';

export const router = Router();

router.use('/auth', authRouter);
router.use('/images', imageRouter);
router.use('/portfolios', portfolioRouter);
router.use('/user-profile', userProfileRouter);
