const PagesController = {
	urJourney: (req, res) => {
		try {
			res.render("yourJourney.ejs");
		} catch (error) {
			console.error(error);
			res.status(500).render("error.ejs");
		}
	},
};

export default PagesController;
