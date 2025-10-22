import datamapper from "../datamappers/userDatamapper.js";
import { verifyGoogleToken } from "../services/googleAuthService.js";
import { generateToken } from "../utils/jwtGenerator.js";

const googleSignIn = async (req, res) => {
	try {
		console.log("Requête de connexion Google reçue");
		console.log("En-têtes de la requête:", req.headers);
		console.log("Corps de la requête:", req.body);

		// Vérifier si le corps de la requête est vide
		if (!req.body || Object.keys(req.body).length === 0) {
			console.error("Corps de la requête vide ou manquant");
			return res.status(400).json({
				success: false,
				message:
					"Le corps de la requête est vide. Assurez-vous d'envoyer un token Google valide.",
				hint: "Le corps de la requête doit contenir { idtoken: 'votre_token_google' }",
			});
		}

		const { idtoken } = req.body;

		if (!idtoken) {
			console.error("Aucun token fourni dans la requête");
			return res.status(400).json({
				success: false,
				message: "Le paramètre 'idtoken' est manquant dans la requête",
				hint: "Assurez-vous d'envoyer le token avec la clé 'idtoken' dans le corps de la requête",
			});
		}

		try {
			// Vérifier le token Google
			console.log("Vérification du token Google...");
			const googleUser = await verifyGoogleToken(idtoken);
			console.log("Utilisateur Google vérifié:", {
				id: googleUser.userid,
				email: googleUser.email,
				picture: googleUser.picture,
			});

			// Vérifier si l'utilisateur existe
			console.log("Recherche de l'utilisateur dans la base de données...");
			let user = await datamapper.findByGoogleId(googleUser.userid);

			if (!user) {
				console.log("Création d'un nouvel utilisateur...");
				try {
					user = await datamapper.create({
						google_id: googleUser.userid,
						email: googleUser.email,
						name: googleUser.name,
						// Assurez-vous que l'URL de la photo est complète
						photo: googleUser.picture
							? googleUser.picture.startsWith("http")
								? googleUser.picture
								: `https:${googleUser.picture}`
							: null,
					});
					console.log("Nouvel utilisateur créé:", {
						id: user.id,
						email: user.email,
					});
				} catch (dbError) {
					console.error(
						"Erreur lors de la création de l'utilisateur:",
						dbError,
					);
					throw new Error(
						`Échec de la création de l'utilisateur: ${dbError.message}`,
					);
				}
			} else {
				console.log("Utilisateur existant trouvé:", {
					id: user.id,
					email: user.email,
				});
			}

			// Générer le token JWT
			console.log("Génération du token JWT...");
			const token = generateToken({
				id: user.id,
				email: user.email,
				name: user.name || "",
				photo: user.photo || "",
			});

			if (!token) {
				throw new Error("Échec de la génération du token JWT");
			}

			console.log(
				"Token généré avec succès (début):",
				`${token.substring(0, 30)}...`,
			);

			// Définir le cookie
			console.log("Définition du cookie de session...");
			const isProduction = process.env.NODE_ENV === "production";
			
			// For local development, we'll use more permissive settings
			const cookieOptions = {
				httpOnly: true,
				secure: false, // Set to false for local development
				sameSite: 'lax', // Use 'lax' for local development
				maxAge: 24 * 60 * 60 * 1000, // 24 hours
				path: "/",
				signed: true
			};

			// Only apply production settings in production
			if (isProduction) {
				cookieOptions.secure = true;
				cookieOptions.sameSite = 'none';
				cookieOptions.domain = 'yourdomain.com';
			}

			console.log('Cookie options:', JSON.stringify(cookieOptions, null, 2));

			// Set the cookie
			res.cookie("token", token, cookieOptions);
			
			// For debugging - log the cookie being set
			console.log('Setting cookie with options:', JSON.stringify(cookieOptions, null, 2));

			// Mettre à jour l'utilisateur avec les dernières informations
			const userWithPhoto = await datamapper.findByGoogleId(googleUser.userid);

			// S'assurer que l'URL de la photo est correctement formatée
			let photoUrl = userWithPhoto.photo;
			if (photoUrl && !photoUrl.startsWith("http")) {
				photoUrl = `https:${photoUrl}`;
			}

			// Ajouter des logs pour le débogage
			console.log("Photo URL:", photoUrl);

			console.log("Authentification réussie, envoi de la réponse...");
			return res.status(200).json({
				success: true,
				token,
				user: {
					id: userWithPhoto.id,
					email: userWithPhoto.email,
					name: userWithPhoto.name,
				},
				redirectTo: "/dashboard",
			});
		} catch (authError) {
			console.error("Erreur d'authentification Google:", authError);
			throw authError; // Renvoyer l'erreur pour le bloc catch principal
		}
	} catch (error) {
		console.error("Erreur lors de la connexion Google:", {
			message: error.message,
			stack: error.stack,
			name: error.name,
		});

		const statusCode = error.message.includes("manquant") ? 400 : 401;

		res.status(statusCode).json({
			success: false,
			message: `Échec de l'authentification Google: ${error.message}`,
			error:
				process.env.NODE_ENV === "development"
					? {
							message: error.message,
							stack: error.stack,
						}
					: undefined,
		});
	}
};

export default googleSignIn;
