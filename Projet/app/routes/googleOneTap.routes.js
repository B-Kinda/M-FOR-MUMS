import express from 'express';
import { handleGoogleOneTapCallback } from '../controllers/googleOneTap.controller.js';

const router = express.Router();

// Middleware pour parser le corps des requêtes en JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Route pour le callback de Google One Tap
router.post('/auth/google/callback', handleGoogleOneTapCallback);

export default router;
