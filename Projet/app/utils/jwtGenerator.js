// app/utils/jwtGenerator.js
import jwt from "jsonwebtoken";

// JWT Secret - Must match the one in .env file
const JWT_SECRET = process.env.JWT_SECRET || '9de17fbfe06594d1706578446e0b6b16191b59e4fcd40e4728d50095f85ccc05b722daa0bf0e41c848ea15bd9f5dd0b394241937a703d734477a54ee0d50ea3e';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined. Please set it in your .env file');
}

console.log('JWT Secret length:', JWT_SECRET.length);

const generateToken = (user) => {
	console.log("=== Génération du token JWT ===");
	console.log("Données utilisateur:", {
		id: user.id,
		email: user.email,
		name: user.name,
		photo: user.photo,
	});
	console.log(
		"JWT_SECRET length:",
		JWT_SECRET ? JWT_SECRET.length : "undefined",
	);

	const token = jwt.sign(
		{
			id: user.id,
			email: user.email,
			name: user.name,
			photo: user.photo,
		},
		JWT_SECRET,
		{
			expiresIn: "24h", // Le token expire après 24 heures
		},
	);

	console.log(`Token généré (début): ${token.substring(0, 30)}...`);
	console.log(
		"Header décodé:",
		JSON.parse(Buffer.from(token.split(".")[0], "base64").toString()),
	);
	console.log(
		"Payload décodé:",
		JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()),
	);

	return token;
};

const verifyToken = (token) => {
	console.log("=== Vérification du token JWT ===");
	console.log(
		`Token reçu (début): ${token ? `${token.substring(0, 30)}...` : "null"}`,
	);
	console.log(
		`JWT_SECRET length: ${JWT_SECRET ? JWT_SECRET.length : "undefined"}`,
	);

	if (!token) {
		console.error("Aucun token fourni pour la vérification");
		return null;
	}

	try {
		// Décoder le token pour l'affichage (sans vérification)
		const [header, payload] = token.split(".");
		// Utilisation de la virgule de séquence pour ignorer la signature
		const _ = token.split(".")[2]; // Ignorer la signature
		if (header && payload) {
			console.log(
				"Header décodé:",
				JSON.parse(Buffer.from(header, "base64").toString()),
			);
			console.log(
				"Payload décodé (non vérifié):",
				JSON.parse(Buffer.from(payload, "base64").toString()),
			);
		}

		// Vérifier le token
		const decoded = jwt.verify(token, JWT_SECRET);
		console.log("Token vérifié avec succès:", {
			id: decoded.id,
			email: decoded.email,
			exp: new Date(decoded.exp * 1000).toISOString(),
		});
		return decoded;
	} catch (error) {
		console.error("Échec de la vérification du token:", {
			name: error.name,
			message: error.message,
			expiredAt: error.expiredAt,
			// Ne pas logger le token complet pour des raisons de sécurité
			tokenStart: token ? token.substring(0, 10) : "null",
			tokenLength: token ? token.length : 0,
		});
		return null;
	}
};

export { generateToken, verifyToken };
