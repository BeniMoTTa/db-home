import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { CategoryRepo } from "../interfaces/category.interface";

export const ensureNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: CategoryRepo =
    AppDataSource.getRepository(Category);
  const categoryRequest = req.body.name;
  const findCategoryName = await categoryRepository.findOne({
    where: {
      name: categoryRequest,
    },
  });
  if (!Object.keys(req.body).includes("name")) {
    return next();
  }
  if (findCategoryName) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};
