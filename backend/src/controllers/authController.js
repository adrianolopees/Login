/* Rotas de login e registro */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig.js";
import { registerSchema } from "../validators/userValidator.js";
import { loginSchema } from "../validators/userValidator.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Register
export const register = async (req, res) => {
  const validation = registerSchema.safeParse(req.body); // passa pela nosso validador ANTES de salvar
  if (!validation.success) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: validation.error.format(),
    });
  }

  const { username, password, email, name, profilePicture } = req.body;

  try {
    // Verifica se já existe o susuario com username e email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Usuário ou email já existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
        profilePicture,
      },
    });

    res.status(201).json({
      message: "Usúario registrado com sucesso!",
      user: {
        id: newUser.id,
        username: newUser.name,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Dados inválidos!",
      error: validation.error.format(),
    });
  }

  const { identifier, password } = req.body;

  try {
    // verifica se o identifier é a-mail ou username
    const isEmail = typeof identifier === "string" && identifier.includes("@");

    const user = await prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha inválida" });
    }
    console.log("Usuário logado:", user.username);

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdimin: user.isAdmin },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro no servidor:", error: error.message });
  }
};
