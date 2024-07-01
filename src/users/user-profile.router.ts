import { Router } from 'express';

import { authMiddleware } from '../auth/auth.middlewares';
import { userProfileController } from './user-profile.controller';

const router = Router();

router.delete('/',
    authMiddleware.validateToken,
    userProfileController.deleteUserProfile
);

export const userProfileRouter = router;
