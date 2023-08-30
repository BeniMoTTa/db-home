import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { TUser, TUserReturn } from "../interfaces/user.interface";
import { returnUserSchema } from "../schemas/user.schema";

export const createUserService = async (
  clientData: TUser
): Promise<TUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = userRepository.create(clientData);
  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};
