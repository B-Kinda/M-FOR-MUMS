import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { checkAuth } from "./app/middleware/auth.js";
import authRoutes from "./app/routes/auth.routes.js";
import googleOneTapRoutes from "./app/routes/googleOneTap.routes.js";
import mainRouter from "./app/routes/index.routes.js";

dotenv.config();

const app = express();

app.locals.env = process.env;

app.set("view engine", "ejs");
app.set("views", "./app/views");

const port = process.env.PORT || 3000;
app.use(express.static("./app/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || "your-secret-key"));

app.use((_req, res, next) => {
	res.locals.isAuthenticated = false;
	res.locals.user = null;
	next();
});

app.use(checkAuth);
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", true);

	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}

	next();
});

app.use(checkAuth);
app.use("/", mainRouter);
app.use("/auth", authRoutes);
app.use("/", googleOneTapRoutes);

app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
