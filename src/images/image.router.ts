import { Router } from 'express';
import {imageController} from "./image.controller";
import {authMiddleware} from "../auth/auth.middlewares";
import { addImageSchema } from './image.schemas';
import { validate } from '../main-validate-function';
import { headersSchema } from '../auth/auth.schemas';
import { checkPortfolioIdParamSchema } from '../portfolios/portfolio.schemas';

const router = Router();

router.get('/image-feed',
    imageController.getImageFeed,
);

router.use(
    authMiddleware.validateToken,
    validate(headersSchema),
);
router.post('/upload-image/:portfolioId',
    validate(checkPortfolioIdParamSchema),
    validate(addImageSchema),
    imageController.uploadImage,
);

router.delete('/delete-images/:portfolioId',
    validate(checkPortfolioIdParamSchema),
    imageController.deleteImages
);

export const imageRouter = router;
