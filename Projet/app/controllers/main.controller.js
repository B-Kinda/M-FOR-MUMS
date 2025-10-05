const mainController = {
	homepage: (req, res) => {
		try {
			res.render("home.page.ejs");
		} catch (error) {
			console.error(error);
			res.status(500).render("error.ejs");
		}
	},
};

export default mainController;
