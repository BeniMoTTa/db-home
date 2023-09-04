import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { LoginReq } from "../../interfaces/login.interface";
import "dotenv/config";
import { UserRepo } from "../../interfaces/users.interface";

export const createLoginService = async (
  loginData: LoginReq
): Promise<string> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordHash = await compare(loginData.password, user.password);
  if (!passwordHash) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );
  return token;
};
