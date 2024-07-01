import {IComment} from "../../db/entity/comment.entity";
import {IPortfolio} from "../portfolios/portfolio.models";

export interface IImageFeed {
    image: string;
    description: string;
    portfolio: string;
    comments?: string[];
}

export interface IImage {
    id: number;
    name: string;
    description: string;
    portfolio: IPortfolio;
    comments?: IComment[];
    createdAt: string;
}
