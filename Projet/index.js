import "dotenv/config";
import express from "express";
import router from "./app/routes/index.routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./app/views");

const port = process.env.PORT || 3000;

app.use(express.static("./app/public"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
