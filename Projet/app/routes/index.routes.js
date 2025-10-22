import { Router } from "express";
import mainRouter from "./main.routes.js";
import pagesRouter from "./pages.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

// Routes d'authentification
router.use("/auth", authRouter);

// Routes principales
router.use(mainRouter);
router.use(pagesRouter);

export default router;
