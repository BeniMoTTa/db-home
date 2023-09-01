import { Request, Response } from "express";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
) => {
  try {
    const realEstateData = req.body;
    const contact = await createRealEstateService(realEstateData, req);

    return res.status(201).json(contact);
  } catch (err) {
    console.log(err);
  }
};
