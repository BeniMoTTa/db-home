import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

export type LoginReq = z.infer<typeof createLoginSchema>;
