import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const main = async () => {
  const email = "sbellurkar@gmail.com";
  const name = "Shankar Bellurkar";
  const password = "sbellurkar123";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("SuperAdmin already exists!");
    return;
  }

  // Create new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "SUPERADMIN",
    },
  });

  console.log("SuperAdmin created:", user);
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
