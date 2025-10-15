import { Router } from "express";
import pagesController from "../controllers/pages.controller.js";

const pagesRouter = Router();

pagesRouter.get("/yourJourney", pagesController.urJourney);
pagesRouter.get("/work", pagesController.work);

export default pagesRouter;
