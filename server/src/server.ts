import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { PrismaClient } from "../generated/prisma";
import authRoute from "./routes/authRoute";
import { startServer } from "./utils/startServer";
import logger from "./utils/logger/logger";
export const app = express();
export const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
    if (Object.keys(req.body).length) {
      logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    }
  });

  next();
});

app.use("/api/auth", authRoute);
startServer();

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Un-Handled Rejection at : ", promise, " reason: ", reason);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
