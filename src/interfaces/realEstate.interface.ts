import { z } from "zod";
import {
  realEstateSchema,
  returnRealEstateSchema,
  returnRetrieveHouseSchema,
} from "../schemas/realEstate.schema";
import { DeepPartial } from "typeorm";

export type TRealEstate = z.infer<typeof realEstateSchema>;
export type TRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
export type TRealEstateRetrieveAll = z.infer<typeof returnRetrieveHouseSchema>;
export type TRealEstateUpdate = DeepPartial<TRealEstate>[];
