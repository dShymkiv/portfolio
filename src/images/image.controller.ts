import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../api-interfaces';
import { imageService } from './image.services';
import { ResponseCodesEnum } from '../../errors/response-codes.enum';

class ImageController {
    public async getImageFeed(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await imageService.getImageFeed();

            res.json({ data });
        } catch (e) {
            next(e);
        }
    };

    public async uploadImage(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await imageService.uploadImage(req.body, +req.params['portfolioId'], req.userProfile?.id);

            res.status(ResponseCodesEnum.CREATED).json({ data });
        } catch (e) {
            next(e);
        }
    };

    public async deleteImages(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            await imageService.deleteImages(+req.params['portfolioId'], req.body?.imageIds, req.userProfile?.id);

            res.status(ResponseCodesEnum.NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    };
}

export const imageController = new ImageController();
