import { config } from "dotenv";
config();
import { app, prisma } from "../server";

export async function startServer() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
