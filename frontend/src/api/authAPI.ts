import apiClient from "./config";
import {
  IUser,
  ISignUpData,
  ILoginData,
  IForgotPasswordData,
  IResetPasswordData,
} from "../app/models/user";
import { IApiResponse } from "../app/models/shared";

export const signUp = async (userData: ISignUpData): Promise<IUser> => {
  try {
    const response = await apiClient.post<
      IApiResponse<{
        user: {
          id: string;
          email: string;
          isVerified: boolean;
        };
      }>
    >("/auth/sign-up", userData);

    return response.data.data!.user as IUser;
  } catch (error) {
    throw new Error("Failed to sign up");
  }
};

export const signIn = async (credentials: ILoginData): Promise<IUser> => {
  try {
    const response = await apiClient.post<
      IApiResponse<{
        user: {
          id: string;
          email: string;
          isVerified: boolean;
        };
      }>
    >("/auth/log-in", credentials);

    return response.data.data!.user as IUser;
  } catch (error) {
    throw new Error("Failed to sign in");
  }
};

export const getMyProfile = async (): Promise<IUser> => {
  try {
    const response =
      await apiClient.get<IApiResponse<{ user: IUser }>>("/auth/me");
    return response.data.data!.user;
  } catch (error) {
    throw new Error("No active session found");
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await apiClient.get("/auth/log-out");
  } catch (error) {
    throw new Error("Failed to sign out");
  }
};

export const forgotPassword = async (
  data: IForgotPasswordData,
): Promise<void> => {
  try {
    await apiClient.post("/auth/forget-password", data);
  } catch (error) {
    throw new Error("Failed to send password reset email");
  }
};

export const resetPassword = async (
  token: string,
  data: IResetPasswordData,
): Promise<IUser> => {
  try {
    const response = await apiClient.patch<
      IApiResponse<{
        user: {
          id: string;
          email: string;
        };
      }>
    >(`/auth/reset-password?token=${token}`, data);

    return response.data.data!.user as IUser;
  } catch (error) {
    throw new Error("Failed to reset password");
  }
};

export const verifyEmail = async (token: string): Promise<IUser> => {
  try {
    const response = await apiClient.get<
      IApiResponse<{
        user: {
          id: string;
          email: string;
          isVerified: boolean;
        };
      }>
    >(`/auth/verify-email?token=${token}`);

    return response.data.data!.user as IUser;
  } catch (error) {
    throw new Error("Failed to verify email");
  }
};
