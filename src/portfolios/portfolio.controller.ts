import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../api-interfaces';
import { ResponseCodesEnum } from '../../errors/response-codes.enum';
import { portfolioService } from './portfolio.services';

class PortfolioController {
    public async getPortfolioById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await portfolioService.getPortfolioById(+req.params['portfolioId'], req.userProfile?.id);

            res.json({ data });
        } catch (e) {
            next(e);
        }
    };

    public async getPortfoliosByUserProfileId(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await portfolioService.getPortfoliosByUserProfileId(req.userProfile?.id);

            res.status(ResponseCodesEnum.CREATED).json({ data });
        } catch (e) {
            next(e);
        }
    };

    public async createPortfolio(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await portfolioService.createPortfolio(req.body, req?.userProfile);

            res.status(ResponseCodesEnum.CREATED).json({ data });
        } catch (e) {
            next(e);
        }
    };

    public async deletePortfolioById(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            await portfolioService.deletePortfolioById(+req.params['portfolioId'], req.userProfile?.id);

            res.status(ResponseCodesEnum.NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    };
}

export const portfolioController = new PortfolioController();
