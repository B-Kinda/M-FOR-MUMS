import dotenv from "dotenv";
import express from "express";
import router from "./app/routes/index.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.locals.env = process.env;

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./app/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
