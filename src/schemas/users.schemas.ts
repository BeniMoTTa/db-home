import { z } from "zod";

export const userSchema = z.object({
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
});
export const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

export const userUpdateSchema = userSchema.partial().omit({ admin: true });
export const returnAllUserSchema = returnUserSchema.array();
