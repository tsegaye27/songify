import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginData, ISignUpData, IUser } from "../../app/models/user";

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  appLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  appLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthStart: (state) => {
      state.appLoading = true;
    },
    checkAuthSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.appLoading = false;
    },
    checkAuthFailure: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.appLoading = false;
    },
    loginStart: (state, _action: PayloadAction<ILoginData>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    signUpStart: (state, _action: PayloadAction<ISignUpData>) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  checkAuthStart,
  checkAuthSuccess,
  checkAuthFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logout,
  clearError,
} = authSlice.actions;
export default authSlice.reducer;
