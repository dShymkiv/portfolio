import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePortfolios1719600451789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS portfolios (
            id SERIAL PRIMARY KEY,
            name VARCHAR(250) NOT NULL,
            description VARCHAR(250) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES user_profiles(id)
           )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS portfolios
        `);
    }
}
