import { Router } from "express";
import { listAllCategoriesController } from "../controllers/category.controller";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controller";
import { ensureAddressIsValid } from "../middlewares/ensureAddressIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminTrue } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenValid } from "../middlewares/ensureTokenIsValid.middleware";
import { realEstateSchema } from "../schemas/realEstate.schemas";

export const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenValid,

  ensureDataIsValidMiddleware(realEstateSchema),
  createRealEstateController
);

realEstateRoutes.get("", listRealEstateController);
