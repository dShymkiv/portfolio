import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { config } from '../../config/config';
import { PortfolioEntity } from './portfolio.entity';
import { UserSessionEntity } from './user-sessions.entity';
import { IUserProfile } from '../../src/users/user-profile.models';

@Entity('user_profiles', { database: config.DATABASE_NAME })
export class UserProfileEntity implements IUserProfile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'first_name',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    firstName!: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    lastName!: string;

    @Column({
        type: 'int',
        default: 1
    })
    age?: number;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
    phone!: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    password!: string;

    @Column({
        name: 'created_at',
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;

    @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.user, { cascade: true, onDelete: 'CASCADE' })
    portfolios?: PortfolioEntity[];

    @OneToMany(() => UserSessionEntity, (session) => session.user, { cascade: true, onDelete: 'CASCADE' })
    sessions?: UserSessionEntity[];
}
