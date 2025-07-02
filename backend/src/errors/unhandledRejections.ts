import mongoose from "mongoose";
import logger from "../config/winston";
import { ExceptionTypes } from "../utils/enums";
import { logMessages } from "../utils/messages/logMessages";
import { Server } from "http";
import { errorMessages } from "../utils/messages/errorMessages";

export const handleUnhandledRejections = (server: Server) => {
  process.on(ExceptionTypes.UnhandledRejection, async (reason, promise) => {
    logger.error(errorMessages.unhandledRejection(promise, reason));

    const shutdown = async () => {
      try {
        await mongoose.connection.close();
        logger.info(logMessages.exceptions.shutdownMessage);
      } catch (shutdownError) {
        const e = shutdownError as Error;
        logger.error(errorMessages.shutdownError(e.message));
      } finally {
        server.close(() => {
          process.exit(1);
        });
      }
    };

    await shutdown();
  });
};
