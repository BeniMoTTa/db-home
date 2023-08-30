import express, { Request, Response, NextFunction, Router } from "express";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const adminExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminRepository = AppDataSource.getRepository(User);
    const adminUser = await adminRepository.findOne({
      where: { isAdmin: true },
    });

    if (adminUser) {
      return res.status(400).json({ message: "Admin user already exists." });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking admin existence." });
  }
};
