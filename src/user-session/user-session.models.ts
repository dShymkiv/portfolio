import { IUserProfile } from '../users/user-profile.models';

export interface IUserSession {
    id?: number;
    accessToken: string;
    user: IUserProfile;
    createdAt?: string;
}
