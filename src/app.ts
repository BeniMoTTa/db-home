import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { createAdmin, userRouter } from "./routers/users.routes";
import { realEstateRouter } from "./routers/realEstate.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/create-admin", createAdmin);
app.use("/users", userRouter);
app.use("/realEstate", realEstateRouter);

export { app };
