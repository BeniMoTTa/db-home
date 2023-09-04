import { Router } from "express";
import {
  createCategoryController,
  listAllCategoriesController,
  oneListCategoryController,
} from "../controllers/category.controller";

import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIdCategoryFromListen } from "../middlewares/ensureIdCategoryFromListen.middleware";
import { ensureIsAdminTrue } from "../middlewares/ensureIsAdmin.middleware";
import { ensureNameExistsMiddleware } from "../middlewares/ensureNameExistsMiddleware";
import { ensureTokenValid } from "../middlewares/ensureTokenIsValid.middleware";
import { categoryTableSchema } from "../schemas/category.schemas";

export const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  ensureTokenValid,
  ensureIsAdminTrue,
  ensureDataIsValidMiddleware(categoryTableSchema),
  ensureNameExistsMiddleware,
  createCategoryController
);
categoryRoutes.get("", listAllCategoriesController);

categoryRoutes.get(
  "/:id/realEstate",
  ensureIdCategoryFromListen,
  oneListCategoryController
);
