const PagesController = {
	urJourney: (req, res) => {
		try {
			res.render("yourJourney.ejs");
		} catch (error) {
			console.error(error);
			res.status(500).render("error.ejs");
		}
	},
	work: (req, res) => {
		try {
			res.render("work.ejs");
		} catch (error) {
			console.error(error);
			res.status(500).render("error.ejs");
		}
	},
	signup: (req, res) => {
		try {
			res.render("signUp.ejs", {
				googleClientId: process.env.GOOGLE_CLIENT_ID,
			});
		} catch (error) {
			console.error(error);
			res.status(500).render("error.ejs");
		}
	},
};

export default PagesController;
