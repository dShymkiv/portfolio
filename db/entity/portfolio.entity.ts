import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { config } from '../../config/config';
import { UserProfileEntity } from './user-profile.entity';
import { ImageEntity } from './image.entity';
import { IPortfolio } from '../../src/portfolios/portfolio.models';

@Entity('portfolios', { database: config.DATABASE_NAME })
export class PortfolioEntity implements IPortfolio {
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

    @ManyToOne(() => UserProfileEntity, (user) => user.portfolios, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: UserProfileEntity;

    @OneToMany(() => ImageEntity, (image) => image.portfolio, { cascade: true, onDelete: 'CASCADE' })
    images?: ImageEntity[];
}
