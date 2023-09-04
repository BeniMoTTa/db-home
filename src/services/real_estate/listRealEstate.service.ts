import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import {
  RepoRealEstate,
  ReturnAllRealEstates,
  ReturnRealEstate,
} from "../../interfaces/realEstate.interface";
import {
  returnRetrieveAllRealEstate,
  returnRealEstateSchema,
} from "../../schemas/realEstate.schemas";

export const listAllRealEstateService =
  async (): Promise<ReturnAllRealEstates> => {
    const realEstateRepository: RepoRealEstate =
      AppDataSource.getRepository(RealEstate);

    const findRealEstate: Array<RealEstate> = await realEstateRepository.find({
      relations: {
        address: true,
      },
    });

    const realEstate = returnRetrieveAllRealEstate.parse(findRealEstate);

    return realEstate;
  };
