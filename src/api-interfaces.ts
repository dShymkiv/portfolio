import { Request } from 'express';

import { IUserProfile } from './users/user-profile.models';

export interface IRequestExtended extends Request{
    userProfile?: IUserProfile;
}
