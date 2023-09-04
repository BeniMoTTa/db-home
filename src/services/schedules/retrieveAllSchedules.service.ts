import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";
import { RepoRealEstate } from "../../interfaces/realEstate.interface";
import { RepoSchedule } from "../../interfaces/schedule.interface";

export const retrieveAllSchedulesService = async (
  id: number
): Promise<RealEstate> => {
  const realEstateRepository: RepoRealEstate =
    AppDataSource.getRepository(RealEstate);
  const scheduleRepository: RepoSchedule =
    AppDataSource.getRepository(Schedule);
  const findRealEstate = await realEstateRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!findRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }
  const scheduleFind: any = await realEstateRepository
    .createQueryBuilder("realEstate")
    .select(["realEstate", "address", "category", "schedule", "user"])
    .innerJoin("realEstate.address", "address")
    .innerJoin("realEstate.category", "category")
    .innerJoin("realEstate.schedules", "schedule")
    .innerJoin("schedule.user", "user")
    .where("realEstate.id = :id", { id })
    .getOne();

  return scheduleFind!;
};
