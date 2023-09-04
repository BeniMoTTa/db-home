import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { CategoryRepo } from "../interfaces/category.interface";

export const ensureIdCategoryFromListen = async (
  req: Request,
  resp: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: CategoryRepo =
    AppDataSource.getRepository(Category);

  const categoryFindData = await categoryRepository.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!categoryFindData) {
    throw new AppError("Category not found", 404);
  }

  return next();
};
