import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createUser() {
  const username = "usuarioTeste";
  const email = "usuarioTeste@email.com";
  const name = "Usuário Teste";
  const password = "123456";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
        profilePicture,
      },
    });
    console.log("Usuário criado com sucesso:", user);
  } catch (error) {
    console.error("Erro ao criar usuario:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
