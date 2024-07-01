import {
    DeleteResult,
    EntityRepository,
    getManager,
    Repository,
} from 'typeorm';

import { UserProfileEntity } from '../../db/entity/user-profile.entity';
import { IUserProfile } from './user-profile.models';


@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends Repository<UserProfileEntity> {
    public async createUserProfile(user: IUserProfile): Promise<IUserProfile> {
        return getManager().getRepository(UserProfileEntity).save(user);
    };

    public async getUserByEmail(email: string): Promise<IUserProfile | undefined> {
        return getManager().getRepository(UserProfileEntity)
            .createQueryBuilder('user_profile')
            .where('user_profile.email = :email', { email })
            .getOne();
    };

    public async deleteUserProfile(userProfileId?: number): Promise<DeleteResult> {
        return getManager().getRepository(UserProfileEntity).delete({ id: userProfileId });
    };
}

export const userProfileRepository = new UserProfileRepository();
