export interface IUser {
  _id?: string;
  id: string;
  email: string;
  role?: "user" | "admin";
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IForgotPasswordData {
  email: string;
}

export interface IResetPasswordData {
  password: string;
  passwordConfirm: string;
}
