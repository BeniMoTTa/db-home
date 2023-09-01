import { z } from "zod";
import { TypeEnum } from "../entities/realEstate.entity";

export const realEstateSchema = z.object({
  cep: z.string(),
  complement: z.string(),
  number: z.number(),
  type: z.nativeEnum(TypeEnum),
  duration: z.number().nullish(),
  rentStartDate: z.string().optional(),
});

export const returnRealEstateSchema = realEstateSchema.extend({
  id: z.string(),
});

export const returnRetrieveHouseSchema = returnRealEstateSchema.array();
export const updateRealEstateSchema = realEstateSchema.partial();
