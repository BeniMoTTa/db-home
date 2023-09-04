import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  retrieveAllUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureDataAlreadyInDataBase } from "../middlewares/ensureDataAlreadyInDataBase.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminTrue } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureUserLogged } from "../middlewares/ensureUserLogged.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";

export const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  ensureDataAlreadyInDataBase,
  createUserController
);

userRoutes.get(
  "",
  ensureTokenValid,
  ensureIsAdminTrue,
  retrieveAllUserController
);
userRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenValid,
  ensureIsAdminTrue,
  deleteUserController
);
userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenValid,
  ensureUserLogged,
  ensureDataIsValidMiddleware(userUpdateSchema),
  updateUserController
);
