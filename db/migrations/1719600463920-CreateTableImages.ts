import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableImages1719600463920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS images (
            id SERIAL PRIMARY KEY,
            name VARCHAR(250) NOT NULL,
            description VARCHAR(250) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
            portfolio_id INT,
            FOREIGN KEY (portfolio_id) REFERENCES portfolios(id)
           )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS images
        `);
    }
}
