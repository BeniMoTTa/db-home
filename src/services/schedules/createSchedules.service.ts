import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { RepoRealEstate } from "../../interfaces/realEstate.interface";
import {
  RepoSchedule,
  ReturnScheduleSchema,
  ScheduleSchema,
} from "../../interfaces/schedule.interface";
import { UserRepo } from "../../interfaces/users.interface";
import { returnScheduleSchema } from "../../schemas/schedule.schema";

export const createScheduleService = async (
  scheduleData: ScheduleSchema,
  userId: number
) => {
  const { date, hour, realEstateId } = scheduleData;

  const realEstateRepository: RepoRealEstate =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realEstateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const scheduleRepository: RepoSchedule =
    AppDataSource.getRepository(Schedule);

  const scheduleUser = await AppDataSource.getRepository(Schedule)
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getOne();

  if (scheduleUser) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }
  const scheduledDate = new Date(date);
  const daysOnWork = scheduledDate.getDay();

  if (daysOnWork < 1 || daysOnWork > 5) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  if (parseInt(hour[0] + hour[1]) < 8 || parseInt(hour[0] + hour[1]) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const scheduleAlreadyExists = await AppDataSource.getRepository(Schedule)
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.userId = :userId", { userId })
    .getOne();

  if (scheduleAlreadyExists) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const newUser = await userRepository.findOneBy({
    id: userId,
  });

  const newSchedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: realEstate!,
    user: newUser!,
  });

  await scheduleRepository.save(newSchedule);
};
