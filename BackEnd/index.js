const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, "public")));

// Parser les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Route pour la page d'accueil
app.get("/", (req, res) => {
	res.render("home.page.ejs");
});

// Démarrer le serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
