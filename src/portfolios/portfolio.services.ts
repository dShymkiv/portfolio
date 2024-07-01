import { portfolioRepository } from './portfolio.repository';
import { Forbidden, NotFound } from '../../errors/api-errors';
import { IUserProfile } from '../users/user-profile.models';
import { IPortfolio } from './portfolio.models';

class PortfolioService {
    public async getPortfolioById(portfolioId?: number, userProfileId?: number): Promise<IPortfolio> {
        const portfolio = await portfolioRepository.getPortfolioById(portfolioId);

        if (!portfolio) {
            throw new NotFound('Portfolio not found');
        }
        if (portfolio.user.id !== userProfileId) {
            throw new Forbidden('Forbidden');
        }

        return portfolio;
    };

    public async getPortfoliosByUserProfileId(userProfileId?: number): Promise<IPortfolio[]> {
        return portfolioRepository.getPortfoliosByUserProfileId(userProfileId);
    };

    public async createPortfolio(portfolio: IPortfolio, userProfile?: IUserProfile): Promise<IPortfolio> {
        if (userProfile)
        portfolio.user = userProfile;

        return portfolioRepository.createPortfolio(portfolio);
    };

    public async deletePortfolioById(portfolioId: number, userProfileId?: number): Promise<void> {
        await this.getPortfolioById(portfolioId, userProfileId);
        await portfolioRepository.deletePortfolioById(portfolioId);
    };
}

export const portfolioService = new PortfolioService();
