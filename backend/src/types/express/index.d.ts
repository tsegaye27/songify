import { UserInterface } from "../models/user/types";

declare global {
  namespace Express {
    export interface Request {
      user?: UserInterface;
      permission?: any;
    }
  }
}
