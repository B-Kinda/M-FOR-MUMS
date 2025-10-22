import { Router } from "express";
import pagesController from "../controllers/pages.controller.js";
import { auth } from "../middleware/auth.js";

const pagesRouter = Router();

/**
 * Route protégée pour le tableau de bord
 * Nécessite une authentification
 */
pagesRouter.get(
  "/dashboard",
  (req, res, next) => {
    // Ce middleware vérifie si l'utilisateur est authentifié
    // et ajoute les informations utilisateur à res.locals
    return auth(req, res, next);
  },
  pagesController.dashboard
);

// Routes publiques
pagesRouter.get("/yourJourney", pagesController.urJourney);
pagesRouter.get("/work", pagesController.work);
pagesRouter.get("/signup", pagesController.signup);

export default pagesRouter;
