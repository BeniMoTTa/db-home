import { Request, Response } from "express";
import { TUser } from "../interfaces/user.interface";
import { createUserService } from "../services/createUser.service";
import { User } from "../entities/user.entity";
import { retrieveUserService } from "../services/retrieveAllUsers.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: TUser = req.body;

  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export const retrieveAllUserController = async (
  req: Request,
  res: Response
) => {
  const user = await retrieveUserService();
  return res.status(200).json(user);
};
