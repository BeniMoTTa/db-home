import { z } from "zod";
import { returnRealEstateSchema } from "./realEstate.schemas";
import { returnUserSchema } from "./users.schemas";

export const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const returnScheduleSchema = z.object({
  id: z.number(),
  date: z.date().or(z.string()),
  hour: z.string(),
  realEstate: returnRealEstateSchema,
  user: returnUserSchema,
});
