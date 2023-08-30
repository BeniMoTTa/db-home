import * as z from "zod";
import { UserGender } from "../entities/user.entity";

export const userSchema = z.object({
  userName: z.string(),
  userEmail: z.string(),
  userPhoto: z.string(),
  userCep: z.string(),
  userComplement: z.string(),
  userPassword: z.string(),
  gender: z.nativeEnum(UserGender),
  isAdmin: z.boolean(),
});
export const returnUserSchema = userSchema
  .extend({
    id: z.string(),
  })
  .omit({ userPassword: true, isAdmin: true });
export const returnRetrieveUserSchema = returnUserSchema.array();
export const updateUserSchema = userSchema.partial();
