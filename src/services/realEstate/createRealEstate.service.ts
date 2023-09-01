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
  const duration = data.type === TypeEnum.RENT ? data.duration : undefined;
  const rentStartDate =
    data.type === TypeEnum.RENT ? data.rentStartDate : undefined;
  const realEstate = realEstateRepository.create({
    cep: data.cep,
    complement: data.complement,
    number: data.number,
    type: data.type,
    duration: duration,
    rentStartDate: rentStartDate,
    user: user,
  });
  await realEstateRepository.save(realEstate);
  const newRealEstate = returnRealEstateSchema.parse(realEstate);
  return newRealEstate;
};
