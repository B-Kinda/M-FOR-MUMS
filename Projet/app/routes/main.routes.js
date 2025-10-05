import { Router } from "express";
import mainController from "../controllers/main.controller.js";

const homeRouter = Router();

homeRouter.get("/", mainController.homepage);

export default homeRouter;
