import { DeleteResult } from 'typeorm';

import { userProfileRepository } from './user-profile.repostory';
import { IUserProfile } from './user-profile.models';

class UserProfileService {
    public async createUserProfile(user: IUserProfile): Promise<IUserProfile> {
        return userProfileRepository.createUserProfile(user);
    };

    public async getUserProfileByEmail(param: string): Promise<IUserProfile | undefined> {
        return userProfileRepository.getUserByEmail(param);
    };

    public async deleteUserProfile(userProfileId?: number): Promise<DeleteResult> {
        return userProfileRepository.deleteUserProfile(userProfileId);
    };
}

export const userProfileService = new UserProfileService();
