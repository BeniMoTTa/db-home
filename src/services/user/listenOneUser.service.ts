import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

export const listenOneUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id },
    relations: {
      realEstate: true,
    },
    select: [
      "id",
      "userCep",
      "userComplement",
      "userEmail",
      "userName",
      "userPassword",
      "userPhoto",
    ],
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  // if (user.id !== tokenId) {
  //   throw new AppError("Unauthorized", 401);
  // }
  return user;
};
