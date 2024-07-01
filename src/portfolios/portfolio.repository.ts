import {
    EntityRepository,
    getManager,
    Repository,
} from 'typeorm';

import { PortfolioEntity } from '../../db/entity/portfolio.entity';
import { IPortfolio}  from './portfolio.models';

@EntityRepository(PortfolioEntity)
export class PortfolioRepository extends Repository<PortfolioEntity> {
    public async getPortfolioById(portfolioId?: number): Promise<IPortfolio | undefined> {
        return getManager().getRepository(PortfolioEntity)
            .createQueryBuilder('portfolios')
            .leftJoinAndSelect('portfolios.images', 'images')
            .leftJoinAndSelect('portfolios.user', 'user_profiles')
            .where('portfolios.id = :portfolioId', { portfolioId })
            .getOne();
    };

    public async deletePortfolioById(portfolioId: number): Promise<void> {
        await getManager().getRepository(PortfolioEntity).delete({ id: portfolioId });
    };

    public async createPortfolio(portfolio: IPortfolio): Promise<IPortfolio> {
        return getManager().getRepository(PortfolioEntity).save(portfolio);
    };

    public async getPortfoliosByUserProfileId(userProfileId?: number): Promise<IPortfolio[]> {
        return getManager().getRepository(PortfolioEntity)
            .createQueryBuilder('portfolios')
            .leftJoinAndSelect('portfolios.user', 'user_profiles')
            .leftJoinAndSelect('portfolios.images', 'images')
            .leftJoinAndSelect('images.comments', 'comments')
            .where('portfolios.user_id = :userProfileId', { userProfileId })
            .getMany();
    };
}

export const portfolioRepository = new PortfolioRepository();
