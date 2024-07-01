import {
    DeleteResult,
    EntityRepository,
    getManager,
    In,
    Repository,
} from 'typeorm';

import { ImageEntity } from "../../db/entity/image.entity";
import {IImage} from "./image.models";

@EntityRepository(ImageEntity)
export class ImageRepository extends Repository<ImageEntity> {
    public async getImageFeed(): Promise<IImage[]> {
        return getManager().getRepository(ImageEntity)
            .createQueryBuilder('images')
            .leftJoinAndSelect('images.portfolio', 'portfolio')
            .leftJoinAndSelect('images.comments', 'comments')
            .addSelect('portfolio.name')
            .orderBy('images.createdAt', 'ASC')
            .getMany();
    };

    public async createImage(image: IImage): Promise<IImage> {
        return getManager().getRepository(ImageEntity).save(image);
    };

    public async deleteImagesByPortfolioId(portfolioId: number, imageIds?: number[]): Promise<DeleteResult> {
        const imageRepository = getManager().getRepository(ImageEntity);

        if (imageIds && imageIds.length > 0) {
            return imageRepository.delete({ id: In(imageIds), portfolio: { id: portfolioId } });
        } else {
            return imageRepository.delete({ portfolio: { id: portfolioId } });
        }
    }
}

export const imageRepository = new ImageRepository();
