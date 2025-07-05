import apiClient from "./config";
import { ICreateSongData, ISong, IUpdateSongData } from "../app/models/song";
import { IApiResponse } from "../app/models/shared";

export type AddSongProp = ICreateSongData;

export const fetchSongs = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  artist?: string;
  genre?: string;
  album?: string;
}): Promise<{ songs: ISong[]; pagination: any }> => {
  try {
    const response = await apiClient.get<
      IApiResponse<{
        songs: ISong[];
        pagination: any;
      }>
    >("/songs", { params });

    return response.data.data || { songs: [], pagination: null };
  } catch (error) {
    throw new Error("Failed to fetch songs");
  }
};

export const addSong = async (song: AddSongProp): Promise<ISong> => {
  try {
    const response = await apiClient.post<IApiResponse<{ song: ISong }>>(
      "/songs",
      song,
    );
    return response.data.data!.song;
  } catch (error) {
    throw new Error("Failed to add song");
  }
};

export const deleteSong = async (id: string): Promise<string> => {
  try {
    await apiClient.delete<IApiResponse>(`/songs/${id}`);
    return id;
  } catch (error) {
    throw new Error("Failed to delete song");
  }
};

export const updateSong = async (song: IUpdateSongData): Promise<ISong> => {
  try {
    const { _id, ...updateData } = song;
    const response = await apiClient.patch<IApiResponse<{ song: ISong }>>(
      `/songs/${_id}`,
      updateData,
    );
    return response.data.data!.song;
  } catch (error) {
    throw new Error("Failed to update song");
  }
};

export const searchSongs = async (query: string): Promise<ISong[]> => {
  try {
    const response = await apiClient.get<
      IApiResponse<{
        songs: ISong[];
        query: string;
      }>
    >("/songs/search", { params: { q: query } });

    return response.data.data?.songs || [];
  } catch (error) {
    throw new Error("Failed to search songs");
  }
};

export const fetchGenres = async (): Promise<string[]> => {
  try {
    const response =
      await apiClient.get<IApiResponse<{ genres: string[] }>>(
        "/songs/meta/genres",
      );
    return response.data.data?.genres || [];
  } catch (error) {
    throw new Error("Failed to fetch genres");
  }
};

export const fetchAlbums = async (): Promise<string[]> => {
  try {
    const response =
      await apiClient.get<IApiResponse<{ albums: string[] }>>(
        "/songs/meta/albums",
      );
    return response.data.data?.albums || [];
  } catch (error) {
    throw new Error("Failed to fetch albums");
  }
};
