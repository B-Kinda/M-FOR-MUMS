// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
	try {
		// Debug request headers and cookies
		console.log("=== Auth Middleware Debug ===");
		console.log("Request Method:", req.method);
		console.log("Request URL:", req.originalUrl);
		console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
		console.log("Raw Cookies:", req.headers.cookie || "No cookies in headers");
		console.log("Parsed Cookies:", req.cookies || "No parsed cookies");
		console.log("Signed Cookies:", req.signedCookies || "No signed cookies");

		// Check token in Authorization header
		const authHeader = req.header("Authorization");
		const tokenFromHeader = authHeader?.startsWith("Bearer ")
			? authHeader.replace("Bearer ", "")
			: null;

		// Check token in cookies (try both signed and unsigned)
		const tokenFromCookies = req.cookies?.token;
		const tokenFromSignedCookies = req.signedCookies?.token;

		// Log all possible token sources
		console.log("Token sources:", {
			header: tokenFromHeader ? "Token found in header" : "No token in header",
			cookies: tokenFromCookies
				? "Token found in cookies"
				: "No token in cookies",
			signedCookies: tokenFromSignedCookies
				? "Token found in signed cookies"
				: "No token in signed cookies",
		});

		// Try to get token from any source
		const token = tokenFromHeader || tokenFromSignedCookies || tokenFromCookies;

		console.log("Auth Middleware - Token sources:", {
			header: authHeader
				? "Authorization header present"
				: "No Authorization header",
			tokenFromHeader: tokenFromHeader
				? "Token in header"
				: "No token in header",
			tokenFromCookies: tokenFromCookies
				? "Token in cookies"
				: "No token in cookies",
			tokenFromSignedCookies: tokenFromSignedCookies
				? "Token in signed cookies"
				: "No token in signed cookies",
			finalToken: token ? "Token found" : "No token found in any source",
		});

		if (!token) {
			console.log("Auth Middleware - No token found in request");
			return res.status(401).json({
				isAuthenticated: false,
				message: "Accès non autorisé - Aucun token fourni",
			});
		}

		try {
			// Use the same JWT secret as in jwtGenerator.js
			const JWT_SECRET = process.env.JWT_SECRET;

			if (!JWT_SECRET) {
				throw new Error("JWT_SECRET is not defined");
			}

			console.log(
				"Auth Middleware - Verifying token with JWT_SECRET of length:",
				JWT_SECRET.length,
			);

			// Decode token without verification for debugging
			try {
				const decodedWithoutVerify = jwt.decode(token, { complete: true });
				console.log("Auth Middleware - Token décodé (non vérifié):", {
					header: decodedWithoutVerify.header,
					payload: {
						id: decodedWithoutVerify.payload.id,
						email: decodedWithoutVerify.payload.email,
						exp: new Date(
							decodedWithoutVerify.payload.exp * 1000,
						).toISOString(),
					},
				});
			} catch (decodeError) {
				console.error(
					"Erreur lors du décodage du token (non critique):",
					decodeError.message,
				);
			}

			// Vérifier le token
			const decoded = jwt.verify(token, JWT_SECRET);

			console.log("Auth Middleware - Token vérifié avec succès:", {
				userId: decoded.id,
				email: decoded.email,
				exp: new Date(decoded.exp * 1000).toISOString(),
				now: new Date().toISOString(),
			});

			req.user = decoded;
			next();
		} catch (verifyError) {
			console.error("Auth Middleware - Token verification failed:", {
				error: verifyError.message,
				name: verifyError.name,
				token: token.substring(0, 10) + "...", // Log first 10 chars of token
			});
			return res.status(401).json({
				isAuthenticated: false,
				message: `Erreur de token: ${verifyError.message}`,
				type: verifyError.name,
			});
		}
	} catch (error) {
		res.status(401).json({
			isAuthenticated: false,
			message:
				error.name === "JsonWebTokenError"
					? "Token invalide"
					: "Session expirée",
		});
	}
};

// Middleware pour vérifier l'état de connexion dans les vues
const checkAuth = (req, res, next) => {
	res.locals.isAuthenticated = false;
	res.locals.user = null;

	try {
		// Récupérer le token depuis les cookies ou le header Authorization
		let token =
			req.cookies?.token ||
			req.signedCookies?.token ||
			req.header("Authorization")?.replace("Bearer ", "");

		// Nettoyer le token s'il est entouré de guillemets
		if (token) {
			token = token.replace(/^"|"$/g, "");

			try {
				// Use the same JWT secret as in jwtGenerator.js
				const JWT_SECRET =
					process.env.JWT_SECRET ||
					"9de17fbfe06594d1706578446e0b6b16191b59e4fcd40e4728d50095f85ccc05b722daa0bf0e41c848ea15bd9f5dd0b394241937a703d734477a54ee0d50ea3e";

				if (!JWT_SECRET) {
					throw new Error("JWT_SECRET is not defined");
				}

				console.log(
					"CheckAuth - Verifying token with JWT_SECRET of length:",
					JWT_SECRET.length,
				);
				const decoded = jwt.verify(token, JWT_SECRET);

				// Ensure photo has the correct format
				if (decoded?.photo && !decoded.photo.startsWith("http")) {
					decoded.photo = `https:${decoded.photo}`;
				}

				res.locals.user = decoded;
				res.locals.isAuthenticated = true;

				// Ajouter des logs pour le débogage
				console.log("Utilisateur authentifié:", {
					id: decoded.id,
					email: decoded.email,
					hasPhoto: !!decoded.photo,
					photoUrl: decoded.photo,
				});
			} catch (jwtError) {
				console.error("Erreur de vérification JWT:", jwtError.message);
				// En cas d'erreur, on efface le token invalide
				res.clearCookie("token");
			}
		}
	} catch (error) {
		// En cas d'erreur, on considère que l'utilisateur n'est pas connecté
		console.error("Erreur de vérification du token:", error.message);
	}

	next();
};

export { auth, checkAuth };
