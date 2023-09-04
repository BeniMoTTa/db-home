import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";
import { handleErrors } from "./errors";
import { createAdmin, userRoutes } from "./routers/users.routes";
import { loginRoutes } from "./routers/login.routes";
import { categoryRoutes } from "./routers/category.routes";
import { realEstateRoutes } from "./routers/realEstate.routes";
import { scheduleRoutes } from "./routers/schedule.routes";
import { storage } from "./multerConfig";
import multer from "multer";

const uploadUser = multer({ storage: storage });
const app = express();

app.use(cors());
app.use(express.json());
app.use("/create-admin", createAdmin);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoryRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", scheduleRoutes);
app.post("/upload", uploadUser.single("photoPath"), (req, res) => {
  return res.json(req.file?.filename);
});

app.use("/files", express.static("uploads"));

app.use(handleErrors);

export { app };
