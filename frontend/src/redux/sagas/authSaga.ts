import { SagaIterator } from "redux-saga";
import { getMyProfile, signIn, signOut } from "../../api/authAPI";
import { call, put, takeLatest } from "redux-saga/effects";
import { IUser } from "../types";
import {
  checkAuthFailure,
  checkAuthSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../slices/authSlice";
import { clearFavorites, loadFavorites } from "../slices/favoritesSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ILoginData } from "../../app/models/user";
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
    toast.error(error.message || "Login failed");
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
}
