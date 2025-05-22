/* Rotas de login e registro */

// Importando hash e token
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// importando models e jwt
import User from "../models/userModel.js";
import { JWT_SECRET } from "../config/jwtConfig.js";

// importando validators
import { registerSchema } from "../validators/userValidator.js";

// Register
export const register = async (req, res) => {
  const validation = registerSchema.safeParse(req.body); // passa pela nosso validador ANTES de salvar
  if (!validation.success) {
    return res.status(400).json({
      message: "Dados inválidos",
      errors: validation.error.format(),
    });
  }

  const { username, password, email, name } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe!" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email já existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Usúario registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // verifica se o identifier é a-mail ou username
    const isEmail = typeof identifier === "string" && identifier.includes("@");
    const query = isEmail ? { email: identifier } : { username: identifier };

    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, isAdimin: user.isAdmin },
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
