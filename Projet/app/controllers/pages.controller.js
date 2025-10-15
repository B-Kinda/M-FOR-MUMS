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
};

export default PagesController;
