import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableSessions1719615561227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS user_sessions (
            id SERIAL PRIMARY KEY,
            access_token VARCHAR(250) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES user_profiles(id)
           )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS user_sessions
        `);
    }
}
