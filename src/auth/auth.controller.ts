import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../api-interfaces';
import { Constants } from '../../config/constants';
import { authService } from './auth.services';
import { ResponseCodesEnum } from '../../errors/response-codes.enum';
import { IUserProfile } from '../users/user-profile.models';

class AuthController {
    public async signUpUser(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body as IUserProfile;
            const data = await authService.signUpUser(user);

            res.json({ data });
        } catch (e) {
            next(e);
        }
    };

    public async loginUser (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.userProfile as IUserProfile;
            const accessToken = await authService.loginUser(user, req.body.password);

            res.json(accessToken);
        } catch (e) {
            next(e);
        }
    };

    public async logoutUser (req: IRequestExtended, res: Response, next:NextFunction): Promise<void> {
        try {
            // logout from one device
            const accessToken = req.get(Constants.AUTHORIZATION);

            await authService.logoutUser(accessToken?.replace('Bearer ', ''));

            res.status(ResponseCodesEnum.NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    };
}

export const authController = new AuthController();
