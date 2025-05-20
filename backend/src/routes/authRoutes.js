import express from "express";
import { register, login } from "../controllers/authController.js";

// Criando um objeto router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API funcionando!");
});

// colocando no objeto o caminho passando os controladores
router.post("/register", register);
router.post("/login", login);

export default router;
