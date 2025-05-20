// configura o Express, middlewares e rotas
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// recebendo as rotas com os controladores
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// passando as rotas
app.use("/", authRoutes);

export default app;
