import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const adminRepository = AppDataSource.getRepository(User);
    const adminUser = adminRepository.create({
      userName: "admin",
      userPassword: "admin123",
      userEmail: "admin@mail.com",
      userPhoto: "https://cdn-icons-png.flaticon.com/512/2304/2304226.png",
      userCep: "45990-000",
      userComplement: "casa",
      isAdmin: true,
    });
    await adminRepository.save(adminUser);
    res.status(201).json({ message: "Admin user successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create admin user" });
  }
};
