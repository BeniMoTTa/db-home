import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";
import {
  categoryTableSchema,
  returnRetrieveAllCategory,
  returnCategorySchema,
} from "../schemas/category.schemas";
import { returnRetrieveAllRealEstate } from "../schemas/realEstate.schemas";

export type CategorySchema = z.infer<typeof categoryTableSchema>;
export type ReturnCategory = z.infer<typeof returnCategorySchema>;
export type ReturnAllCategory = z.infer<typeof returnRetrieveAllCategory>;
export type CategoryRepo = Repository<Category>;
export type CategoryAllRealEstate = Array<Category>;
