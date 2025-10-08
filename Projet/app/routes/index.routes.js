import { Router } from "express";
import mainRouter from "./main.routes.js";
import pagesRouter from "./pages.routes.js";

const router = Router();

router.use(mainRouter);
router.use(pagesRouter);

export default router;
