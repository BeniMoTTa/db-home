import { Repository } from "typeorm";
import { z } from "zod";
import { Address, RealEstate } from "../entities";
import {
  addressSchema,
  realEstateSchema,
  returnRetrieveAllRealEstate,
  returnRealEstateSchema,
} from "../schemas/realEstate.schemas";

export type RealEstateRequest = z.infer<typeof realEstateSchema>;
export type AddressGet = z.infer<typeof addressSchema>;
export type ReturnRealEstate = z.infer<typeof returnRealEstateSchema>;
export type RepoRealEstate = Repository<RealEstate>;
export type RepoAddress = Repository<Address>;
export type ReturnAllRealEstates = z.infer<typeof returnRetrieveAllRealEstate>;
