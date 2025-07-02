import "express-async-errors";

import { PORT } from "./config/environments";
import app from "./config/express";
import { connectDB } from "./config/mongoose";
import logger from "./config/winston";
import { handleUncaughtExceptions } from "./errors/uncaughtExceptions";
import { handleUnhandledRejections } from "./errors/unhandledRejections";
import { errorMessages } from "./utils/messages/errorMessages";
import { logMessages } from "./utils/messages/logMessages";

handleUncaughtExceptions();

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(logMessages.server.serverRunning(PORT));
    });

    handleUnhandledRejections(server);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(errorMessages.dbConnectionFailed(error.message));
    } else {
      logger.error(errorMessages.unknownDbConnectionError);
    }
    process.exit(1);
  }
};

startServer();
