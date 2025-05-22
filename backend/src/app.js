// configura o Express, middlewares e rotas
import express from "express";
import cors from "cors";

// recebendo as rotas com os controladores
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Monta todas as rotas do authRoutes com o prefixo /api/auth
app.use("/api/auth", authRoutes);

export default app;
