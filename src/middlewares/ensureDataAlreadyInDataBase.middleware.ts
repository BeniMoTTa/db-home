import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { UserRepo } from "../interfaces/users.interface";

export const ensureDataAlreadyInDataBase = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const findData = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!!findData) {
    throw new AppError("Email already exists", 409);
  }
  return next();
};
