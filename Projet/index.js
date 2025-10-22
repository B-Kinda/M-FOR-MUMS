import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { checkAuth } from "./app/middleware/auth.js";
import authRoutes from "./app/routes/auth.routes.js";

dotenv.config();

import express from "express";
import router from "./app/routes/index.routes.js";

const app = express();

app.locals.env = process.env;

app.set("view engine", "ejs");
app.set("views", "./app/views");

const port = process.env.PORT || 3000;
app.use(express.static("./app/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'your-secret-key')); // Add a secret for signed cookies
// CORS configuration for development and production
app.use((req, res, next) => {
  // For local development, allow all origins
  const isLocalDevelopment = process.env.NODE_ENV !== 'production';
  
  if (isLocalDevelopment) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  } else {
    // Production CORS settings
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'https://yourdomain.com',
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    }
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  }
  
  next();
});
app.use(checkAuth);

app.use("/auth", authRoutes);

app.use(router);

app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
