import {
  userSchema,
  returnUserSchema,
  returnAllUserSchema,
} from "../schemas/users.schemas";
import { z } from "zod";
import { User } from "../entities";
import { DeepPartial, Repository } from "typeorm";

export type UserInfo = z.infer<typeof userSchema>;
export type UserReturn = z.infer<typeof returnUserSchema>;
export type UserRepo = Repository<User>;
export type UserRetrieveAll = z.infer<typeof returnAllUserSchema>;
export type UserUpdate = DeepPartial<UserInfo>;
