import express from "express";
import googleSignIn from "../controllers/authGoogle.controller.js";
import { auth } from "../middleware/auth.js"; // Importez le middleware d'authentification

const router = express.Router();

// POST /auth/google - Gère la connexion Google
router.post("/google", googleSignIn);

// GET /auth/check - Vérifie si l'utilisateur est connecté
router.get("/check", auth, (req, res) => {
	res.json({
		isAuthenticated: true,
		user: req.user,
	});
});

// GET /auth/logout - Déconnexion
router.get("/logout", (_req, res) => {
	// Effacer le cookie de session
	res.clearCookie("token");
	
	// Rediriger vers la page d'accueil
	res.redirect("/");
});

// GET /auth/dashboard - Page de tableau de bord protégée
router.get("/dashboard", auth, (req, res) => {
	res.render("dashboard", {
		user: req.user,
	});
});

export default router;
