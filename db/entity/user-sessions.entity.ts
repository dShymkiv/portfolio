import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { config } from '../../config/config';
import { UserProfileEntity } from './user-profile.entity';
import { IUserSession } from '../../src/user-session/user-session.models';

@Entity('user_session', { database: config.DATABASE_NAME })
export class UserSessionEntity implements IUserSession {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        name: 'access_token',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
    accessToken!: string;

    @Column({
        name: 'created_at',
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string;

    @ManyToOne(() => UserProfileEntity, (user) => user.sessions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: UserProfileEntity;
}
