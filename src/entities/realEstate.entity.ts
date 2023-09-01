import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

export enum TypeEnum {
  BUY = "to buy",
  RENT = "to rent",
}

@Entity("realEstate")
export class RealEstate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cep: string;

  @Column()
  complement: string;

  @Column()
  number: number;

  @Column({ type: "enum", enum: TypeEnum, default: TypeEnum.BUY })
  type: TypeEnum;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: "date", nullable: true })
  rentStartDate: Date;

  @ManyToOne(() => User, (user) => user.realEstate)
  user: User;
}
