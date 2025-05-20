// carrega JWT_SECRET do .env
import dotenv from "dotenv";
dotenv.config();

console.log("JWT_SECRET no config:", process.env.JWT_SECRET);

export const JWT_SECRET = process.env.JWT_SECRET;
