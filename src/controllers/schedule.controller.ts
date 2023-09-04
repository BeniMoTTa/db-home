import { Request, Response } from "express";
import { createScheduleService } from "../services/schedules/createSchedules.service";
import { retrieveAllSchedulesService } from "../services/schedules/retrieveAllSchedules.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const ScheduleData = req.body;
  const userId = +req.user.id;

  const schedule = await createScheduleService(ScheduleData, userId);

  return res.status(201).json({ message: "Schedule created" });
};

export const retrieveAllScheduleController = async (
  req: Request,
  res: Response
) => {
  const id: number = +req.params.id;
  const scheduleRealEstate = await retrieveAllSchedulesService(id);
  return res.status(200).json(scheduleRealEstate);
};
