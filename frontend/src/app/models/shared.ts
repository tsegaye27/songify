export interface ITimeStamp {
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse<T = any> {
  status: "success" | "error" | "fail";
  message?: string;
  data?: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalSongs?: number;
    totalPlaylists?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}

export interface IApiError {
  status: "error" | "fail";
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
}
