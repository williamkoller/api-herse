import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserInfos1631585228827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user_infos" (
        "id" SERIAL NOT NULL,
        "cnh" character varying(11) NOT NULL,
        "cpf" character varying(11) NOT NULL,
        "rg" character varying(8) NOT NULL,
        "nationality" character varying NOT NULL,
        "userId" integer NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "user_infos_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "user_infos_pk" PRIMARY KEY ("id"));`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_infos";`);
  }
}
