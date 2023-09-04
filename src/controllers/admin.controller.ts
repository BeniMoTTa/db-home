import { Request, Response } from "express";
import { User } from "../entities/users.entity";
import { AppDataSource } from "../data-source";

export const createAdminController = async (req: Request, res: Response) => {
  try {
    const adminRepository = AppDataSource.getRepository(User);
    const adminUser = adminRepository.create({
      name: "admin",
      password: "admin123",
      email: "admin@mail.com",
      photoPath: "https://cdn-icons-png.flaticon.com/512/2304/2304226.png",
      CEP: "45990000",
      complement: "casa",
      admin: true,
    });
    await adminRepository.save(adminUser);
    res.status(201).json({ message: "Admin user successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create admin user" });
  }
};
