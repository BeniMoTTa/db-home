import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { AppDataSource } from "../data-source";
import { User } from "../entities";

export const ensureIsAdminUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const existingAdmin = await userRepository.findOne({
    where: { admin: true },
  });
  if (existingAdmin && req.body.admin === true) {
    return res.status(403).json({ error: "Another admin already exists" });
  }
  next();
};
