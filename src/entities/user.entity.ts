import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from "typeorm";
import { House } from "./house.entity";

export enum UserGender {
  MALE = "male",
  FEMALE = "female",
  NOBINARY = "no binary",
  DEFAULT = "No say",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userName: string;

  @Column({ unique: true })
  userEmail: string;

  @Column()
  userPhoto: string;

  @Column()
  userCep: string;

  @Column()
  userComplement: string;

  @Column()
  userPassword: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashpassword() {
    const encrypted = getRounds(this.userPassword);
    if (!encrypted) {
      this.userPassword = hashSync(this.userPassword, 10);
    }
  }
  @Column({ type: "enum", enum: UserGender, default: UserGender.DEFAULT })
  gender: UserGender;

  @OneToMany(() => House, (house) => house.user)
  houses: House[];
}