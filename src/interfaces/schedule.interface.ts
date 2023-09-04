import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import {
  returnScheduleSchema,
  scheduleSchema,
} from "../schemas/schedule.schema";

export type RepoSchedule = Repository<Schedule>;
export type ScheduleSchema = z.infer<typeof scheduleSchema>;
export type ReturnScheduleSchema = z.infer<typeof returnScheduleSchema>;
export type RetrieveSchedules = Array<Schedule>;
