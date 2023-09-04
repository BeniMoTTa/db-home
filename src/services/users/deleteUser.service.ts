import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { UserRepo } from "../../interfaces/users.interface";

const deleteUserService = async (idUser: number): Promise<void> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  await userRepository.softRemove(user!);
};

export default deleteUserService;
