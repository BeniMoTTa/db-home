import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../errors";
import { RepoAddress } from "../interfaces/realEstate.interface";

export const ensureAddressIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const addressRepository: RepoAddress = AppDataSource.getRepository(Address);
  const requestData: Address = req.body.address;
  if (requestData) {
    const addressFindOne: Address | null = await addressRepository.findOne({
      where: {
        street: requestData.street,
        zipCode: requestData.zipCode,
        number: req.body.address?.number,
        city: requestData.city,
        state: requestData.state,
      },
    });

    if (addressFindOne !== null) {
      throw new AppError("Address already exists", 409);
    }
  }
  return next();
};
