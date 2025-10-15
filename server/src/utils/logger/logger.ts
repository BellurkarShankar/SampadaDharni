import { transports, createLogger, format } from "winston";

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  defaultMeta: {
    service: "backend",
  },
  format: format.combine(
    format.errors({
      stack: true,
    }),
    format.splat(),
    format.simple(),
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
    new transports.File({
      filename: "combined.log",
    }),
  ],
});
export default logger;
