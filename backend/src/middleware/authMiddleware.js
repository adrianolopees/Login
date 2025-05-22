import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // token deve vir no formato: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // armazena os dados do token na req
    next(); // segue a proxima etapa (rota protegida)
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
};

export default authenticateToken;
