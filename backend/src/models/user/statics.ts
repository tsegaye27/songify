import { Model } from "mongoose";
import { UserInterface } from "./types";

export async function signUpUser(
  this: Model<UserInterface>,
  newUser: Omit<
    UserInterface,
    "_id" | "createdAt" | "updatedAt" | "generateAuthToken"
  >,
): Promise<UserInterface> {
  return this.create(newUser);
}

export async function findUserById(
  this: Model<UserInterface>,
  id: string,
): Promise<UserInterface | null> {
  return this.findById(id);
}

export async function findUserByEmail(
  this: Model<UserInterface>,
  email: string,
): Promise<UserInterface | null> {
  return this.findOne({ email }).select("+password");
}
