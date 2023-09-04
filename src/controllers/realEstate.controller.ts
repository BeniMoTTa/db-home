import { Request, Response } from "express";
import { RealEstateRequest } from "../interfaces/realEstate.interface";
import { listAllRealEstateService } from "../services/real_estate/listRealEstate.service";
import { createRealEstateService } from "../services/real_estate/realEstate.address.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
) => {
  const realEstateData: RealEstateRequest = req.body;

  const realEstateResponse = await createRealEstateService(realEstateData);
  return res.status(201).json(realEstateResponse);
};

export const listRealEstateController = async (req: Request, res: Response) => {
  const realEstate = await listAllRealEstateService();

  return res.status(200).json(realEstate);
};
