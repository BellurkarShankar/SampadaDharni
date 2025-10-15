import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { PrismaClient } from "../generated/prisma";
import authRoute from "./routes/authRoute";
import { startServer } from "./utils/startServer";
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
app.use("/api/auth", authRoute);
startServer();
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
