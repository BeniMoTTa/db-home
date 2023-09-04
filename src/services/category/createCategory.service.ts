import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  CategorySchema,
  CategoryRepo,
  ReturnCategory,
} from "../../interfaces/category.interface";
import { returnCategorySchema } from "../../schemas/category.schemas";

export const createCategoryService = async (
  userData: CategorySchema
): Promise<ReturnCategory> => {
  const categoryRepository: CategoryRepo =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(userData);

  await categoryRepository.save(category);

  const newCategory = returnCategorySchema.parse(category);

  return newCategory;
};
