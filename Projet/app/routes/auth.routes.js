const express = require("express");
const router = express.Router();
const authGoogleController = require("../controllers/authGoogleController"); // Importez votre contrôleur

// POST /api/auth/google/signin
router.post("/google/signin", authGoogleController.googleSignIn);

export default router;
