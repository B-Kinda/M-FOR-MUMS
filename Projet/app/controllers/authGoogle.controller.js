const googleAuthService = require("../services/googleAuthService");
// Remplacez par votre modèle Sequelize pour les utilisateurs
const datamapper = require("../datamappers/userDatamapper");
// Fonction pour générer le JWT (si vous utilisez JWT pour l'authentification) [3, 33]
const jwtGenerator = require("../utils/jwtGenerator");

googleSignIn = async (req, res, next) => {
	// Assurez-vous d'utiliser un middleware pour parser le corps x-www-form-urlencoded
	// afin que req.body.idtoken soit accessible.
	const idToken = req.body.idtoken;

	if (!idToken) {
		return res.status(400).json({ error: "Jeton manquant." }); // 400 Bad Request [33]
	}

	try {
		// 1. Validation du jeton via le service [23]
		const profile = await googleAuthService.verifyGoogleToken(idToken);

		// 2. Recherche de l'utilisateur dans la BDD par l'ID Google (le 'sub' unique) [30]
		let user = await datamapper.findUserByGoogleId(profile.userid);

		if (!user) {
			// 3. Si l'utilisateur n'existe pas, créer un nouveau compte [30]
			user = await datamapper.create({
				google_id: profile.userid,
				email: profile.email,
				name: profile.name,
				// ...
			});
		}

		// 4. Établir une session (ici, via la génération d'un JWT) [3, 33]
		const jwtToken = jwtGenerator.generate(user.id);

		// Réponse réussie : Renvoyer le token JWT [33]
		return res.status(200).json({
			message: "Connexion Google réussie",
			token: jwtToken,
			user: { id: user.id, email: user.email },
		});
	} catch (error) {
		console.error("Erreur de connexion Google:", error.message);
		// Renvoyer 401 Unauthorized pour les échecs d'authentification [33]
		return res.status(401).json({ error: "Authentification Google invalide." });
	}
};

export default googleSignIn;
