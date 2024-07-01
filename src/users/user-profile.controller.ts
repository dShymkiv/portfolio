import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../api-interfaces';
import { ResponseCodesEnum } from '../../errors/response-codes.enum';
import { userProfileService } from './user-profile.services';

class UserProfileController {
    public async deleteUserProfile(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            await userProfileService.deleteUserProfile(req.userProfile?.id);

            res.status(ResponseCodesEnum.NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    };
}

export const userProfileController = new UserProfileController();
