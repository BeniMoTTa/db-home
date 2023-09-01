import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommand1693576596085 implements MigrationInterface {
    name = 'CreateCommand1693576596085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "userEmail" character varying NOT NULL, "userPhoto" character varying NOT NULL, "userCep" character varying NOT NULL, "userComplement" character varying NOT NULL, "userPassword" character varying NOT NULL, "isAdmin" boolean NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'No say', CONSTRAINT "UQ_9047b2d58f91586f14f0cf44a45" UNIQUE ("userEmail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."realEstate_type_enum" AS ENUM('to buy', 'to rent')`);
        await queryRunner.query(`CREATE TABLE "realEstate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying NOT NULL, "complement" character varying NOT NULL, "number" integer NOT NULL, "type" "public"."realEstate_type_enum" NOT NULL DEFAULT 'to buy', "rentDuration" integer, "rentStartDate" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_3dda4b00f0afdfda35742b06969" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_e882a8e93023e098e9976f61945" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_e882a8e93023e098e9976f61945"`);
        await queryRunner.query(`DROP TABLE "realEstate"`);
        await queryRunner.query(`DROP TYPE "public"."realEstate_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
