import { z } from "zod";
import { returnCategorySchema } from "./category.schemas";

export const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(6).optional().nullable(),
  city: z.string().max(20),
  state: z.string().max(2),
});

export const returnAddress = addressSchema.extend({
  id: z.number(),
});

export const realEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().positive(),
  address: addressSchema,
  categoryId: z.number(),
});

export const returnRealEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().optional().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  value: z.number().or(z.string()),
  size: z.number().positive(),
  address: returnAddress,
  category: returnCategorySchema,
});

export const returnRetrieveAllRealEstate = returnRealEstateSchema
  .partial()
  .array();
