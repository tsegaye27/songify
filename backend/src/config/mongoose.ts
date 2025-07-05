// database.ts
import mongoose from "mongoose";
import { MONGO_URI } from "./environments";
import logger from "./winston";
import { logMessages } from "../utils/messages/logMessages";
import { errorMessages } from "../utils/messages/errorMessages";
import { MongooseConnectionEvent } from "../utils/enums";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info(logMessages.db.connected);

    mongoose.connection.on(MongooseConnectionEvent.Connected, () => {
      logger.info(logMessages.db.mongooseConnected);
    });

    mongoose.connection.on(MongooseConnectionEvent.Error, (err) => {
      logger.error(errorMessages.mongooseConnectionError(err.message));
    });

    mongoose.connection.on(MongooseConnectionEvent.Disconnected, () => {
      logger.info(logMessages.db.disconnected);
    });
  } catch (error: any) {
    logger.error(errorMessages.initialConnectionError(error.message));
    throw new Error(errorMessages.mongoConnectionFailed);
  }
};
