import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { RealEstate } from "./realEstate.entity";
import { User } from "./users.entity";

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate;
  @ManyToOne(() => User)
  user: User;
}
export { Schedule };
