import dotenv from "dotenv";
import Joi from "joi";
import { NodeEnv } from "../utils/enums";
import { errorMessages } from "../utils/messages/errorMessages";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
dotenv.config({ path: ".env" });

const envSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  NODE_ENV: Joi.string().default(NodeEnv.Development),
  PORT: Joi.number().default(5000),
})
  .unknown()
  .required();

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(errorMessages.envValidationErr(error.message));
}

export const PORT = value.PORT;
export const MONGO_URI = value.MONGO_URI;
export const JWT_SECRET = value.JWT_SECRET;
