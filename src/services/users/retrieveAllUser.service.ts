import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { UserRepo, UserRetrieveAll } from "../../interfaces/users.interface";
import { returnAllUserSchema } from "../../schemas/users.schemas";

export const retrieveAllUserService = async (): Promise<UserRetrieveAll> => {
  const repositoryUser: UserRepo = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await repositoryUser.find();

  const users = returnAllUserSchema.parse(findUsers);
  return users;
};
