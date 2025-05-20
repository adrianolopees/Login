// Rotas de login e registro

// Importando
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// importando models e jwt
import { users } from "../models/userModel.js";
import { JWT_SECRET } from "../config/jwtConfig.js";

// Register
export const register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Usuário já existe!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "Usuário registrado com sucesso!" });
};

// Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha inválida!" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login bem-sucedido!", token });
};
