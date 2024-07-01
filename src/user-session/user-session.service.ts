import { userSessionRepository } from './user-session.repository';
import { IUserSession } from './user-session.models';

class UserSessionService {
    public async createUserSession(userSession: IUserSession): Promise<IUserSession> {
        return userSessionRepository.createUserSession(userSession);
    };

    public async deleteUserSession(accessToken: string): Promise<void> {
        return userSessionRepository.deleteUserSession(accessToken);
    };
}

export const userSessionService = new UserSessionService();

