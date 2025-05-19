import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// simulando banco de dados
const users = [];

// Rota principal
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Rota cadastro de usuário
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário já existe
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Usuário já existe!" });
  }

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Adiciona o novo usuário ao "banco de dados"
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "Usuário registrado com sucesso!" });
});

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário existe
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado!" });
  }

  // Verifica a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha inválida!" });
  }

  // Gera um token JWT
  const token = jwt.sign({ username }, "secreta", { expiresIn: "1h" });

  res.json({ message: "Login bem-sucedido!", token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
