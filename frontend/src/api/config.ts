import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IApiError, IApiResponse } from "../app/models/shared";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse<IApiResponse>) => {
    return response;
  },
  (error) => {
    const apiError: IApiError = {
      status: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "An unknown error occured",
      errors: error.response?.data?.errors || [],
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;
export const url = API_BASE_URL;
