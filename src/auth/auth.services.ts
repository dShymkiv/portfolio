import { checkPasswords, generateAccessToken, hashPassword } from '../../services/jwt.service';
import { userSessionService } from '../user-session/user-session.service';
import { userProfileService } from '../users/user-profile.services';
import { BadRequest } from '../../errors/api-errors';
import { IUserProfile } from '../users/user-profile.models';

class AuthService {
    public async authorizedUser(user: IUserProfile): Promise<{ accessToken: string }> {
        const email = user.email;
        const userId = user.id;

        const accessToken = generateAccessToken({ id: userId, email });
        await userSessionService.createUserSession({ accessToken, user });

        return { accessToken } ;
    };

    public async loginUser(user: IUserProfile, requestPassword: string): Promise<{ accessToken: string }> {
        await checkPasswords(user.password, requestPassword);

        return await this.authorizedUser(user);
    };

    public async logoutUser(accessToken: string = ''): Promise<void> {
        await userSessionService.deleteUserSession(accessToken);
    };

    public async signUpUser(user: IUserProfile): Promise<{ accessToken: string, userProfile: IUserProfile }> {
        const existedUser = await userProfileService.getUserProfileByEmail(user.email);
        if (existedUser) {
            throw new BadRequest(`User with this email: ${user.email} already exists`);
        }

        const hashedPassword = await hashPassword(user.password);

        const createdUser: IUserProfile = await userProfileService.createUserProfile({...user, password: hashedPassword});
        const { accessToken } = await this.authorizedUser(createdUser);

        return {
            accessToken,
            userProfile: {...createdUser, password: '****'}
        };
    };
}

export const authService = new AuthService();
