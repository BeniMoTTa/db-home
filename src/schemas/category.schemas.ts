import { z } from "zod";
import { realEstateSchema } from "./realEstate.schemas";

export const categoryTableSchema = z.object({
  name: z.string().min(3).max(45),
});

export const returnCategorySchema = categoryTableSchema.extend({
  id: z.number(),
});

export const returnRetrieveAllCategory = returnCategorySchema.array();
