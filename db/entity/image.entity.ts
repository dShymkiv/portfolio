import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { config } from '../../config/config';
import { PortfolioEntity } from './portfolio.entity';
import { CommentEntity } from './comment.entity';
import { IImage } from '../../src/images/image.models';

@Entity('images', { database: config.DATABASE_NAME })
export class ImageEntity implements IImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    description!: string;

    @Column({
        name: 'created_at',
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;

    @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'portfolio_id' })
    portfolio!: PortfolioEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.image, { cascade: true, onDelete: 'CASCADE' })
    comments?: CommentEntity[];
}
