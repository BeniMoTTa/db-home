import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

export const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: ["houses"],
  });

  if (!user) {
    throw new Error("User not found");
  }
  for (const house of user.houses) {
    await userRepository.manager.remove(house);
  }

  await userRepository.delete(user.id);
};
