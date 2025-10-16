const { OAuth2Client } = require("google-auth-library");
const WEB_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

if (!WEB_CLIENT_ID) {
	throw new Error("GOOGLE_CLIENT_ID non défini dans l'environnement.");
}

const client = new OAuth2Client(WEB_CLIENT_ID);

/**
 * Vérifie l'intégrité du jeton d'ID Google et extrait les informations de profil.
 * La fonction vérifie la signature JWT, aud, exp, et iss [31].
 * @param {string} token Le jeton d'ID reçu du client.
 */

verifyGoogleToken = async (token) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: WEB_CLIENT_ID, // Doit correspondre à votre ID client [23, 29]
		});

		const payload = ticket.getPayload();

		// L'ID unique du compte Google (revendication 'sub') est recommandé comme clé primaire [23, 30, 32]
		const userid = payload.sub;

		// Récupération des informations de profil
		const email = payload.email;
		const name = payload.name;
		// etc.

		return { userid, email, name };
	} catch (error) {
		// En cas d'échec de la vérification (signature invalide, jeton expiré, audience incorrecte)
		throw new Error("Jeton Google invalide ou vérification échouée.");
	}
};

export default verifyGoogleToken;
