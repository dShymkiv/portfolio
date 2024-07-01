import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../api-interfaces';
import { NotFound, Unauthorized } from '../../errors/api-errors';
import { userProfileService} from '../users/user-profile.services';
import { Constants } from '../../config/constants';
import { validateAccessToken } from '../../services/jwt.service';
import { userSessionService } from '../user-session/user-session.service';

class AuthMiddleware {
    public async assignUserToRequest(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const existedUser = await userProfileService.getUserProfileByEmail(req.body.email);

            if (!existedUser) {
                next(new NotFound('User not found'));
                return;
            }

            req.userProfile = existedUser;
            next();
        } catch (e) {
            next(e);
        }
    };

    public async validateToken(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        let token = req.get(Constants.AUTHORIZATION);
        if (!token) {
            throw new Unauthorized('Token is not provided');
        }

        token = token.replace('Bearer ', '');

        try {
            const { email } = await validateAccessToken(token);
            if (!email) {
                throw new Unauthorized('Invalid token');
            }

            req.userProfile = await userProfileService.getUserProfileByEmail(email);

            next();
        } catch (e: any) {
            if (e.message.includes('jwt expired')) {
                await userSessionService.deleteUserSession(token);
            }
            next(e);
        }
    };
}

export const authMiddleware = new AuthMiddleware();
