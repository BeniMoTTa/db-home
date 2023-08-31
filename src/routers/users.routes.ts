import { Router } from "express";
import { createAdminController } from "../controllers/admin.controller";
import { adminExistsMiddleware } from "../middlewares/adminExists.middleware";
import {
  createUserController,
  deleteUserController,
  listenOneUserController,
  retrieveAllUserController,
  updateUserController,
} from "../controllers/users.controller";

export const createAdmin = Router();

createAdmin.post("", adminExistsMiddleware, createAdminController);

export const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", retrieveAllUserController);
userRouter.get("/:id", listenOneUserController);
userRouter.delete("/:id", deleteUserController);
userRouter.patch("/:id", updateUserController);
