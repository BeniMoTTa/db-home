import { Router } from "express";
import {
  createScheduleController,
  retrieveAllScheduleController,
} from "../controllers/schedule.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminTrue } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { scheduleSchema } from "../schemas/schedule.schema";

export const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  ensureTokenValid,
  ensureUserExistsMiddleware,
  ensureDataIsValidMiddleware(scheduleSchema),
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  ensureTokenValid,
  ensureIsAdminTrue,
  retrieveAllScheduleController
);
