import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUsersAddColumnsUserInfos1631667008383
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        ADD COLUMN "cpf" character varying(11),
        ADD COLUMN "cnh" character varying(11),
        ADD COLUMN "rg" character varying(8);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        DROP COLUMN "cpf",
        DROP COLUMN "cnh",
        DROP COLUMN "rg";`);
  }
}
