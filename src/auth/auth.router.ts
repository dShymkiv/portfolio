import { Router } from 'express';

import { authController } from './auth.controller';
import { authMiddleware } from './auth.middlewares';
import { validate } from '../main-validate-function';
import { headersSchema, loginUserSchema, signUpUserProfileSchema } from './auth.schemas';

const router = Router();

router.post('/sign-up',
    validate(signUpUserProfileSchema),
    authController.signUpUser
);

router.post('/login',
    validate(loginUserSchema),
    authMiddleware.assignUserToRequest,
    authController.loginUser
);

router.post('/logout',
    validate(headersSchema),
    authMiddleware.validateToken,
    authController.logoutUser
);

export const authRouter = router;
