import { config } from "dotenv";
config();
import { app, prisma } from "../server";
import logger from "./logger/logger";

export async function startServer() {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server because of ${error}`);
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
