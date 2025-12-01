const PagesController = {
	urJourney: (_req, res) => {
		try {
			res.render("yourJourney");
		} catch (error) {
			console.error("Erreur dans urJourney:", error);
			res.status(500).render("error", {
				error: "Une erreur est survenue lors du chargement de la page.",
				pageTitle: "Erreur",
			});
		}
	},
	work: (_req, res) => {
		try {
			res.render("work");
		} catch (error) {
			console.error("Erreur dans work:", error);
			res.status(500).render("error", {
				error: "Une erreur est survenue lors du chargement de la page Travail.",
				pageTitle: "Erreur",
			});
		}
	},
	signup: (_req, res) => {
		try {
			res.render("signup");
		} catch (error) {
			console.error("Erreur dans signup:", error);
			res.status(500).render("error", {
				error: "Une erreur est survenue lors du chargement de la page.",
				pageTitle: "Erreur",
			});
		}
	},
};

export default PagesController;
