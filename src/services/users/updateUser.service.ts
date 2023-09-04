import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  UserUpdate,
  UserRepo,
  UserReturn,
} from "../../interfaces/users.interface";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  newUserData: UserUpdate,
  idUser: number
): Promise<UserReturn> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });
  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = returnUserSchema.parse(user);

  return updatedUser;
};

export default updateUserService;
