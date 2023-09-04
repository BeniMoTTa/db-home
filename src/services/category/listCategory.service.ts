import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  CategoryRepo,
  ReturnAllCategory,
} from "../../interfaces/category.interface";
import { returnRetrieveAllCategory } from "../../schemas/category.schemas";

export const listAllCategoriesService =
  async (): Promise<ReturnAllCategory> => {
    const categoryRepository: CategoryRepo =
      AppDataSource.getRepository(Category);

    const findCategory: Array<Category> = await categoryRepository.find();

    const categories = returnRetrieveAllCategory.parse(findCategory);

    return categories;
  };
