import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPhoneColumn1738010803839 implements MigrationInterface {
    name = 'FixPhoneColumn1738010803839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(20) NOT NULL`);
    }

}
