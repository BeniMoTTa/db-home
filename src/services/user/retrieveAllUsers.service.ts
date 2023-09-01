import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { TUserRetrieveAll } from "../../interfaces/user.interface";
import { returnRetrieveUserSchema } from "../../schemas/user.schema";

export const retrieveUserService = async (): Promise<TUserRetrieveAll> => {
  const repositoryClient = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await repositoryClient.find({
    relations: {
      realEstate: true,
    },
  });

  const clients = returnRetrieveUserSchema.parse(findUsers);
  return clients;
};
