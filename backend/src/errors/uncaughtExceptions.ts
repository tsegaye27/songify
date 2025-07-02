import mongoose from "mongoose";
import logger from "../config/winston";
import { logMessages } from "../utils/messages/logMessages";
import { errorMessages } from "../utils/messages/errorMessages";
import { ExceptionTypes } from "../utils/enums";

export const handleUncaughtExceptions = () => {
  process.on(ExceptionTypes.UncaughtException, async (error) => {
    logger.error(errorMessages.uncaughtException(error.message), {
      stack: error.stack,
    });
    const shutdown = async () => {
      try {
        await mongoose.connection.close();
        logger.info(logMessages.exceptions.shutdownMessage);
      } catch (shutdownError) {
        const e = shutdownError as Error;
        logger.error(errorMessages.shutdownError(e.message));
      } finally {
        setTimeout(() => {
          process.exit(1);
        }, 100);
      }
    };

    await shutdown();
  });
};
