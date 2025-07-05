import { ICreatePlaylistData, IPlaylist } from "../app/models/playlist";
import { IApiResponse } from "../app/models/shared";
import apiClient from "./config";

export type AddPlaylistProp = ICreatePlaylistData;

export const fetchPlaylists = async (): Promise<IPlaylist[]> => {
  try {
    const response =
      await apiClient.get<IApiResponse<{ playlists: IPlaylist[] }>>(
        "/playlists/my",
      );
    return response.data.data?.playlists || [];
  } catch (error) {
    throw new Error("Failed to fetch playlists");
  }
};

export const fetchPublicPlaylists = async (params?: {
  page?: number;
  limit?: number;
}): Promise<IPlaylist[]> => {
  try {
    const response = await apiClient.get<
      IApiResponse<{ playlists: IPlaylist[]; pagination: any }>
    >("/playlists/public", { params });
    return response.data.data?.playlists || [];
  } catch (error) {
    throw new Error("Failed to fetch public playlists");
  }
};

export const addPlaylist = async (
  playlist: AddPlaylistProp,
): Promise<IPlaylist> => {
  try {
    const response = await apiClient.post<
      IApiResponse<{ playlist: IPlaylist }>
    >("/playlists", playlist);
    return response.data.data!.playlist;
  } catch (error) {
    throw new Error("Failed to create playlist");
  }
};

export const deletePlaylist = async (id: string): Promise<string> => {
  try {
    await apiClient.delete(`/playlists/${id}`);
    return id;
  } catch (error) {
    throw new Error("Failed to delete playlist");
  }
};

export const updatePlaylist = async (
  playlist: IPlaylist,
): Promise<IPlaylist> => {
  try {
    const { _id, ...updateData } = playlist;
    const response = await apiClient.patch<
      IApiResponse<{ playlist: IPlaylist }>
    >(`/playlists/${playlist._id}`, updateData);
    return response.data.data!.playlist;
  } catch (error) {
    throw new Error("Failed to update playlist");
  }
};

export const addSongToPlaylist = async (
  playlistId: string,
  songId: string,
): Promise<IPlaylist> => {
  try {
    const response = await apiClient.post<
      IApiResponse<{ playlist: IPlaylist }>
    >(`/playlists/${playlistId}/songs`, { songId });
    return response.data.data!.playlist;
  } catch (error) {
    throw new Error("Failed to add song to playlist");
  }
};

export const removeSongFromPlaylist = async (
  playlistId: string,
  songId: string,
): Promise<IPlaylist> => {
  try {
    const response = await apiClient.delete<
      IApiResponse<{ playlist: IPlaylist }>
    >(`/playlists/${playlistId}/songs/${songId}`);
    return response.data.data!.playlist;
  } catch (error) {
    throw new Error("Failed to remove song from playlist");
  }
};

export const searchPlaylists = async (query: string): Promise<IPlaylist[]> => {
  try {
    const response = await apiClient.get<
      IApiResponse<{ playlists: IPlaylist[]; query: string }>
    >("/playlists/search", { params: { q: query } });
    return response.data.data?.playlists || [];
  } catch (error) {
    throw new Error("Failed to search playlists");
  }
};
