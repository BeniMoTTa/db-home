import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  CategoryAllRealEstate,
  CategoryRepo,
} from "../../interfaces/category.interface";

export const oneListCategoryService = async (
  id: number
): Promise<CategoryAllRealEstate> => {
  const categoryRepository: CategoryRepo =
    AppDataSource.getRepository(Category);

  const findCategory: CategoryAllRealEstate = await categoryRepository.find({
    where: {
      id: id,
    },
    relations: {
      realEstate: true,
    },
  });

  return findCategory;
};
