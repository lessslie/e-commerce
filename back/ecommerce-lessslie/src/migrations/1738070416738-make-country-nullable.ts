import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCountryNullable1738070416738 implements MigrationInterface {
    name = 'MakeCountryNullable1738070416738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "country" SET NOT NULL`);
    }

}
