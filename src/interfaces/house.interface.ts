import { z } from "zod";
import {
  houseSchema,
  returnHouseSchema,
  returnRetrieveHouseSchema,
} from "../schemas/house.schema";
import { DeepPartial } from "typeorm";

export type THouse = z.infer<typeof houseSchema>;
export type THouseReturn = z.infer<typeof returnHouseSchema>;
export type THouseRetrieveAll = z.infer<typeof returnRetrieveHouseSchema>;
export type THouseUpdate = DeepPartial<THouse>[];
