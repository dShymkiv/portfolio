import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserProfile1719600429793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS user_profiles (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(250) NOT NULL,
            last_name VARCHAR(250) NOT NULL,
            age INT CHECK (age > 0),
            phone VARCHAR(250) NOT NULL UNIQUE,
            email VARCHAR(250) NOT NULL UNIQUE,
            password VARCHAR(250) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS user_profiles
        `);
    }
}
