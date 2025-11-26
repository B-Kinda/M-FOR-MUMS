import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken) => {
	try {
		if (!idToken) {
			console.error("Aucun token fourni");
			throw new Error("Token manquant");
		}

		if (!process.env.GOOGLE_CLIENT_ID) {
			console.error(
				"GOOGLE_CLIENT_ID n'est pas défini dans les variables d'environnement",
			);
			throw new Error("Configuration serveur incomplète");
		}

		console.log("Début de la vérification du token...");
		console.log("Longueur du token:", idToken.length);
		console.log("Client ID utilisé:", process.env.GOOGLE_CLIENT_ID);

		const ticket = await client.verifyIdToken({
			idToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		if (!payload) {
			console.error("Aucune charge utile (payload) dans le ticket");
			throw new Error("Token invalide");
		}

		console.log("Token vérifié avec succès. Payload:", {
			userid: payload.sub,
			email: payload.email,
			name: payload.name,
			hosted_domain: payload.hd, // Domaine hébergé (pour les comptes G Suite)
		});

		return {
			userid: payload.sub,
			email: payload.email,
			name: payload.name,
			picture: payload.picture,
		};
	} catch (error) {
		console.error("Erreur de vérification du token Google:", error.message);
		console.error("Stack trace:", error.stack);

		if (error.message.includes("Token used too late")) {
			console.error("Le token a expiré");
		} else if (error.message.includes("Wrong number of segments")) {
			console.error("Format de token invalide");
		} else if (error.message.includes("Can't parse token payload")) {
			console.error("Impossible d'analyser le token");
		}

		throw new Error(`Échec de l'authentification Google: ${error.message}`);
	}
};
