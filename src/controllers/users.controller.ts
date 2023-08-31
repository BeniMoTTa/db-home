import { Request, Response } from "express";
import { TUser } from "../interfaces/user.interface";
import { createUserService } from "../services/user/createUser.service";
import { retrieveUserService } from "../services/user/retrieveAllUsers.service";
import { listenOneUserService } from "../services/user/listenOneUser.service";
import { deleteUserService } from "../services/user/deleteUser.service";

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

export const listenOneUserController = async (req: Request, res: Response) => {
  const user = await listenOneUserService(req.params.id);
  return res.status(200).json(user);
};
export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id);
  return res.status(204).send();
};
