import { Router } from "express";
import { createRealEstateController } from "../controllers/realEstate.controller";

export const realEstateRouter: Router = Router();

realEstateRouter.post("", createRealEstateController);
