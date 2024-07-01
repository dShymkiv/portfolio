import {
    EntityRepository,
    getManager,
    Repository,
} from 'typeorm';

import { UserSessionEntity } from '../../db/entity/user-sessions.entity';
import { IUserSession } from './user-session.models';

@EntityRepository(UserSessionEntity)
export class UserSessionRepository extends Repository<UserSessionEntity> {
    public async createUserSession(userSession: IUserSession): Promise<IUserSession> {
        return getManager().getRepository(UserSessionEntity).save(userSession);
    };

    public async deleteUserSession(accessToken: string): Promise<void> {
        await getManager().getRepository(UserSessionEntity).delete({ accessToken });
    }
}

export const userSessionRepository = new UserSessionRepository();
