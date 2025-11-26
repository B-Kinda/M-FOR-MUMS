import { OAuth2Client } from "google-auth-library";
import datamapper from "../datamappers/userDatamapper.js";
import { generateToken } from "../utils/jwtGenerator.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Gère le callback de l'authentification Google One Tap
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
export const handleGoogleOneTapCallback = async (req, res) => {
	try {
		// Vérifier la présence du token CSRF
		const csrfTokenCookie = req.cookies.g_csrf_token;
		if (!csrfTokenCookie) {
			return res.status(400).json({
				success: false,
				message: "Aucun jeton CSRF dans le cookie.",
			});
		}

		// Vérifier la correspondance du token CSRF
		if (csrfTokenCookie !== req.body.g_csrf_token) {
			return res.status(400).json({
				success: false,
				message: "Échec de la vérification du jeton CSRF.",
			});
		}

		// Récupérer le jeton d'identité
		const { credential } = req.body;
		if (!credential) {
			return res.status(400).json({
				success: false,
				message: "Aucun jeton d'identification fourni.",
			});
		}

		// Valider le jeton JWT
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		if (!payload) {
			return res.status(400).json({
				success: false,
				message: "Impossible de décoder le jeton d'identification.",
			});
		}

		// Vérifier si l'utilisateur existe déjà
		let user = await datamapper.findByGoogleId(payload.sub);

		// Créer un nouvel utilisateur si nécessaire
		if (!user) {
			user = await datamapper.create({
				google_id: payload.sub,
				email: payload.email,
				firstname: payload.given_name || "",
				lastname: payload.family_name || "",
				avatar_url: payload.picture || "",
			});
		}

		// Générer un jeton JWT pour la session
		const token = generateToken({
			id: user.id,
			email: user.email,
		});

		// Définir le cookie de session
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 24 * 60 * 60 * 1000, // 1 jour
		});

		// Rediriger vers la page d'accueil ou le tableau de bord
		return res.redirect("/dashboard");
	} catch (error) {
		console.error("Erreur lors de l'authentification Google One Tap:", error);
		return res.status(500).json({
			success: false,
			message: "Une erreur est survenue lors de l'authentification.",
			error: error.message,
		});
	}
};

export default {
	handleGoogleOneTapCallback,
};
