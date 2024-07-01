import { IPortfolio } from '../portfolios/portfolio.models';

export interface IUserProfile {
    id?: number;
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    email: string;
    password: string;
    createdAt?: string;
    portfolios?: IPortfolio[];
}

