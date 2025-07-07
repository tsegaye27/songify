import { SagaIterator } from "redux-saga";
import { getMyProfile, signIn, signOut, signUp } from "../../api/authAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { IUser } from "../types";
import {
  checkAuthFailure,
  checkAuthSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../slices/authSlice";
import { clearFavorites, loadFavorites } from "../slices/favoritesSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ILoginData, ISignUpData } from "../../app/models/user";
import toast from "react-hot-toast";

function* checkAuthSaga(): SagaIterator {
  try {
    const user: IUser = yield call(getMyProfile);
    yield put(checkAuthSuccess(user));
    yield put(loadFavorites(user.id));
  } catch (error) {
    yield put(checkAuthFailure());
    yield put(clearFavorites());
  }
}

function* loginSaga(action: PayloadAction<ILoginData>): SagaIterator {
  try {
    const user: IUser = yield call(signIn, action.payload);
    yield put(loginSuccess(user));
    yield put(loadFavorites(user.id));
    toast.success("Login successful!");
  } catch (error: any) {
    yield put(loginFailure(error.message || "Login failed"));
  }
}

function* signUpSaga(action: PayloadAction<ISignUpData>): SagaIterator {
  try {
    yield call(signUp, action.payload);
    yield put(signUpSuccess());
    toast.success("Sign up successful! You can now log in.");
  } catch (error: any) {
    yield put(signUpFailure(error.message || "Sign up failed"));
    toast.error(error.message || "Sign up failed");
  }
}

function* logoutSaga(): SagaIterator {
  try {
    yield call(signOut);
    yield put(clearFavorites());
    toast.success("Logout successful!");
  } catch (error: any) {
    yield put(clearFavorites());
    toast.error(error.message || "Logout failed");
  }
}

export function* watchAuth(): SagaIterator {
  yield takeLatest("auth/checkAuthStart", checkAuthSaga);
  yield takeLatest(loginStart.type, loginSaga);
  yield takeLatest(logout.type, logoutSaga);
  yield takeLatest(signUpStart.type, signUpSaga);
}
