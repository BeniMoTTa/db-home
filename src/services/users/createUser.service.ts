import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  UserInfo,
  UserRepo,
  UserReturn,
} from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schemas";

export const createUserService = async (
  userData: UserInfo
): Promise<UserReturn> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const user = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};
