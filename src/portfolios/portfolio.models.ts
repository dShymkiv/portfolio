import { IImage } from '../images/image.models';
import { IUserProfile } from '../users/user-profile.models';

export interface IPortfolio {
    id: number;
    name: string;
    description: string;
    user: IUserProfile;
    images?: IImage[];
    createdAt?: string;
}
