import { Request, Response } from "express";
import { UserUpdate, UserInfo } from "../interfaces/users.interface";
import { createUserService } from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";

import { retrieveAllUserService } from "../services/users/retrieveAllUser.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: UserInfo = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};
export const retrieveAllUserController = async (
  req: Request,
  res: Response
) => {
  const user = await retrieveAllUserService();

  return res.status(200).json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(+req.params.id);

  return res.status(204).send();
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: UserUpdate = req.body;
  const idUser = +req.params.id;

  const updatedUser = await updateUserService(userData, idUser);

  return res.status(200).json(updatedUser);
};
