import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { CategoryRepo } from "../../interfaces/category.interface";
import {
  RealEstateRequest,
  RepoAddress,
  RepoRealEstate,
  ReturnRealEstate,
} from "../../interfaces/realEstate.interface";
import { returnRealEstateSchema } from "../../schemas/realEstate.schemas";

export const createRealEstateService = async (
  payload: RealEstateRequest
): Promise<ReturnRealEstate> => {
  const addressRepository: RepoAddress = AppDataSource.getRepository(Address);

  const categoryRepository: CategoryRepo =
    AppDataSource.getRepository(Category);

  const addressInfo: Address = addressRepository.create(payload.address);

  await addressRepository.save(addressInfo);

  const realEstateRepository: RepoRealEstate =
    AppDataSource.getRepository(RealEstate);

  const findCategory = await categoryRepository.findOneBy({
    id: payload.categoryId,
  });
  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }
  const realEstate: RealEstate = realEstateRepository.create({
    ...payload,
    address: addressInfo,
    category: findCategory,
  });
  await realEstateRepository.save(realEstate);
  const newData = returnRealEstateSchema.parse(realEstate);
  return newData;
};
