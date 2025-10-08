import { Router } from "express";
import pagesController from "../controllers/pages.controller.js";

const pagesRouter = Router();

pagesRouter.get("/yourJourney", pagesController.urJourney);

export default pagesRouter;
