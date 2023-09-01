import { Request } from "express";
import {
  TRealEstate,
  TRealEstateReturn,
} from "../../interfaces/realEstate.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { RealEstate, TypeEnum } from "../../entities/realEstate.entity";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

export const createRealEstateService = async (
  data: TRealEstate,
  req: Request
): Promise<TRealEstateReturn> => {
  const userId = req.commandUser.id;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found");
  }
  const realEstateRepository = AppDataSource.getRepository(RealEstate);

  const realEstateData: Partial<RealEstate> = {
    cep: data.cep,
    complement: data.complement,
    number: data.number || 0,
    type: data.type,
    user: user,
  };

  if (data.type === TypeEnum.RENT) {
    realEstateData.duration = data.duration;
    realEstateData.rentStartDate = data.rentStartDate;
  }

  const realEstate = realEstateRepository.create(realEstateData);
  await realEstateRepository.save(realEstate);
  const newRealEstate = returnRealEstateSchema.parse(realEstate);
  return newRealEstate;
};
