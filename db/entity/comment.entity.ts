import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { config } from '../../config/config';
import { ImageEntity } from './image.entity';
import { IImage } from '../../src/images/image.models';

export interface IComment {
    id: number;
    comment: string;
    image: IImage;
    createdAt: string;
}

@Entity('comments', { database: config.DATABASE_NAME })
    export class CommentEntity implements IComment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    comment!: string;

    @Column({
        name: 'created_at',
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;

    @ManyToOne(() => ImageEntity, (image) => image.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'image_id' })
    image!: ImageEntity;
}
