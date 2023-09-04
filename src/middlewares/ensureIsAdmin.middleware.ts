import { NextFunction, Response, Request } from "express";
import { AppError } from "../errors";

export const ensureIsAdminTrue = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const admin: boolean = req.user.admin;

  if (admin !== true) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};
