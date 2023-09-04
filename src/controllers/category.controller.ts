import { Request, Response } from "express";
import {
  CategoryAllRealEstate,
  CategorySchema,
} from "../interfaces/category.interface";
import { createCategoryService } from "../services/category/createCategory.service";
import { listAllCategoriesService } from "../services/category/listCategory.service";
import { oneListCategoryService } from "../services/category/oneListCategory.service";

// comando feito para identificar e organizar as categorias

export const createCategoryController = async (req: Request, res: Response) => {
  const categoryData: CategorySchema = req.body;

  const category = await createCategoryService(categoryData);

  return res.status(201).json(category);
};

export const listAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const categories = await listAllCategoriesService();

  return res.json(categories);
};

export const oneListCategoryController = async (
  req: Request,
  res: Response
) => {
  const id: number = +req.params.id;

  const listenCategory: CategoryAllRealEstate = await oneListCategoryService(
    id
  );

  return res.status(200).json(...listenCategory);
};
