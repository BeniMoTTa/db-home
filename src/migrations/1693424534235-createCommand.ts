import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommand1693424534235 implements MigrationInterface {
    name = 'CreateCommand1693424534235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "userEmail" character varying NOT NULL, "userPhoto" character varying NOT NULL, "userCep" character varying NOT NULL, "userComplement" character varying NOT NULL, "userPassword" character varying NOT NULL, "isAdmin" boolean NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'No say', CONSTRAINT "UQ_9047b2d58f91586f14f0cf44a45" UNIQUE ("userEmail"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "house" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying NOT NULL, "complement" character varying NOT NULL, "number" character varying NOT NULL, "gender" "public"."house_gender_enum" NOT NULL DEFAULT 'to buy', "rentDuration" integer, "rentStartDate" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_8c9220195fd0a289745855fe908" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "house" ADD CONSTRAINT "FK_66ced5049503a82d736c336b4cf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "house" DROP CONSTRAINT "FK_66ced5049503a82d736c336b4cf"`);
        await queryRunner.query(`DROP TABLE "house"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
