import { z } from "zod";
import { TypeEnum } from "../entities/house.entity";

export const houseSchema = z.object({
  cep: z.string(),
  complement: z.string(),
  number: z.number(),
  type: z.nativeEnum(TypeEnum),
  rentDuration: z.number().nullish(),
  rentStartDate: z.date().optional(),
});

export const returnHouseSchema = houseSchema.extend({
  id: z.string(),
});

export const returnRetrieveHouseSchema = returnHouseSchema.array();
export const updateHouseSchema = houseSchema.partial();
