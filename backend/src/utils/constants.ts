import config from "config";

//config values
export const ENVIRONMENT = config.get("environment");
export const MORGAN_FORMAT: string = config.get("logging.morgan");
export const LOG_LEVEL: string = config.get("logging.level");

//const numbers
export const SALT_ROUNDS = 12;
export const MAX_TOKEN_AGE = 3 * 24 * 60 * 60;
export const MAX_COOKIE_AGE = MAX_TOKEN_AGE * 1000;
