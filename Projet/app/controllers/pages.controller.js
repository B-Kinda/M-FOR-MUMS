const PagesController = {
	/**
	 * Affiche le tableau de bord de l'utilisateur connecté
	 * @param {Object} _req - L'objet requête (non utilisé)
	 * @param {Object} res - L'objet réponse
	 */
	dashboard: (_req, res) => {
		try {
			if (!res.locals.isAuthenticated) {
				return res.redirect("/signin");
			}
			res.render("dashboard", {
				user: res.locals.user,
				pageTitle: "Tableau de bord",
			});
		} catch (error) {
			console.error("Erreur dans dashboard:", error);
			res.status(500).render("error", {
				error: "Une erreur est survenue lors du chargement du tableau de bord.",
				pageTitle: "Erreur",
			});
		}
	},

	/**
	 * Affiche la page "Votre parcours"
	 * @param {Object} _req - L'objet requête (non utilisé)
	 * @param {Object} res - L'objet réponse
	 */
	urJourney: (_req, res) => {
		try {
			res.render("yourJourney", {
				pageTitle: "Votre parcours",
			});
		} catch (error) {
			console.error("Erreur dans urJourney:", error);
			res.status(500).render("error", {
				error: "Une erreur est survenue lors du chargement de la page.",
				pageTitle: "Erreur",
			});
		}
	},

	/**
	 * Affiche la page "Travail"
	 * @param {Object} _req - L'objet requête (non utilisé)
	 * @param {Object} res - L'objet réponse
	 */
	work: (_req, res) => {
		try {
			res.render("work", {
				pageTitle: "Travail",
			});
		} catch (error) {
			console.error("Erreur dans work:", error);
			res.status(500).render("error", {
				error: "Une erreur est survenue lors du chargement de la page Travail.",
				pageTitle: "Erreur",
			});
		}
	},

	/**
	 * Affiche la page d'inscription
	 * @param {Object} _req - L'objet requête (non utilisé)
	 * @param {Object} res - L'objet réponse
	 */
	signup: (_req, res) => {
		try {
			if (res.locals.isAuthenticated) {
				return res.redirect("/dashboard");
			}
			res.render("signUp", {
				googleClientId: process.env.GOOGLE_CLIENT_ID,
				pageTitle: "Inscription",
			});
		} catch (error) {
			console.error("Erreur dans signup:", error);
			res.status(500).render("error", {
				error:
					"Une erreur est survenue lors du chargement de la page d'inscription.",
				pageTitle: "Erreur",
			});
		}
	},
};

export default PagesController;
