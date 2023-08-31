import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { TUserUpdate, TUserReturn } from "../../interfaces/user.interface";
import { returnUserSchema } from "../../schemas/user.schema";

export const updateUserService = async (
  newUser: TUserUpdate,
  id: string
): Promise<TUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);
  const oldUserData = await userRepository.findOneBy({
    id: id,
  });
  const user = userRepository.create({
    ...oldUserData,
    ...newUser,
  });
  await userRepository.save(user);

  const updateUser = returnUserSchema.parse(user);
  return updateUser;
};
