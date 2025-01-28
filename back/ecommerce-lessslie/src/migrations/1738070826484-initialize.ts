import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1738070826484 implements MigrationInterface {
    name = 'Initialize1738070826484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" SET NOT NULL`);
    }

}
