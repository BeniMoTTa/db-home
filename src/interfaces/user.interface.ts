import { z } from "zod";
import {
  returnRetrieveUserSchema,
  returnUserSchema,
  userSchema,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

export type TUser = z.infer<typeof userSchema>;
export type TUserReturn = z.infer<typeof returnUserSchema>;
export type TUserRetrieveAll = z.infer<typeof returnRetrieveUserSchema>;
export type TUserUpdate = DeepPartial<TUser>[];
