import { Request, Response } from "express";
import { LoginReq } from "../interfaces/login.interface";
import { createLoginService } from "../services/login/createLoginService.service";

// passível de mudanças

export const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: LoginReq = req.body;

  const token = await createLoginService(loginData);

  return res.status(200).json({
    token: token,
  });
};
