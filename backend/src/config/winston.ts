import winston, { Logger } from "winston";
import path from "path";
import { ensureDirectoryExists } from "../utils/helpers/ensureDirectoryExists";
import { ENVIRONMENT, LOG_LEVEL } from "../utils/constants";
import { NodeEnv } from "../utils/enums";

const errorLogPath = path.join("logs", "error.log");
const combinedLogPath = path.join("logs", "combined.log");

ensureDirectoryExists({ filePath: errorLogPath });
ensureDirectoryExists({ filePath: combinedLogPath });

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return ENVIRONMENT === NodeEnv.Production
    ? `${timestamp} [${level}]: ${message}`
    : `[${level}]: ${message}`;
});

const logger: Logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    logFormat,
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
      silent: ENVIRONMENT === NodeEnv.Test,
    }),
  ],
});

if (ENVIRONMENT === NodeEnv.Production) {
  const logDirectory: string = path.join("logs");

  logger.add(
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
  );

  logger.add(
    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log"),
    }),
  );
}

export default logger;
