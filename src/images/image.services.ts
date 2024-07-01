import { imageRepository } from './image.repository';
import { IImage, IImageFeed } from './image.models';
import { portfolioService } from '../portfolios/portfolio.services';

class ImageService {
    public async getImageFeed(): Promise<IImageFeed[]> {
        const imagesData = await imageRepository.getImageFeed();

        const imageFeed = imagesData.map((image) => {
            return {
                image: image.name,
                description: image.description,
                portfolio: image.portfolio.name,
                comments: image.comments?.map((comment) => comment.comment),
            };
        });

        return imageFeed;
    };

    public async uploadImage(image: IImage, portfolioId?: number, userProfileId?: number): Promise<IImage> {
        const portfolio = await portfolioService.getPortfolioById(portfolioId, userProfileId);
        image.portfolio = portfolio;
        const createdImage = await imageRepository.createImage(image);

        return {
            ...createdImage,
            // portfolioId: { ...createdImage.portfolio}
        };
    };

    public async deleteImages(portfolioId: number, imageIds?: number[], userProfileId?: number): Promise<void> {
        await portfolioService.getPortfolioById(portfolioId, userProfileId);
        await imageRepository.deleteImagesByPortfolioId(portfolioId, imageIds);
    };
}

export const imageService = new ImageService();
