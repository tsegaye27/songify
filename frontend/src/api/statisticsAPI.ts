import { IApiResponse } from "../app/models/shared";
import { IStatistics } from "../redux/slices/statisticsSlice";
import apiClient from "./config";

export const fetchStatistics = async (): Promise<IStatistics> => {
  try {
    const response =
      await apiClient.get<IApiResponse<{ statistics: IStatistics }>>(
        "/statistics",
      );
    return response.data.data!.statistics;
  } catch (error) {
    throw new Error("Failed to fetch statistics");
  }
};
