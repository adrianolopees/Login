import express from "express";
import { register, login } from "../controllers/authController.js";
import { getProfile } from "../controllers/getProfile.js";
import authenticateToken from "../middleware/authMiddleware.js";

// Criando um objeto router
const router = express.Router();

router.get("/profile", authenticateToken, getProfile);

// colocando no objeto o caminho passando os controladores
router.post("/register", register);
router.post("/login", login);

export default router;
