import express, { Express } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import cors from "cors";
import routes from "./routes";
import initiatePassport from "./passport";
import notFoundErrorHandler from "../errors/noFoundError";
import { MORGAN_FORMAT } from "../utils/constants";
import { globalErrorHandler } from "../controllers/errorController";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan(MORGAN_FORMAT));

const FRONTEND_URL = process.env.FRONTEND_URL;

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

initiatePassport();
app.use(passport.initialize());

app.use("/api", routes);

app.use(notFoundErrorHandler);

app.use(globalErrorHandler);

export default app;
