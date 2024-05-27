import axios from "axios";
import { TypePlaylist } from "../redux/types";
import { url } from "./config";

export interface AddPlaylistProp {
  name: string;
}

const BASE_URL = url;

export const fetchPlaylists = async (): Promise<TypePlaylist[]> => {
  try {
    const response = await axios.get<TypePlaylist[]>(`${BASE_URL}/playlists`);
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch playlists");
  }
};

export const addPlaylist = async (
  playlist: AddPlaylistProp
): Promise<TypePlaylist> => {
  try {
    const response = await axios.post<TypePlaylist>(
      `${BASE_URL}/playlists`,
      playlist
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to create playlist");
  }
};

export const deletePlaylist = async (id: string): Promise<string> => {
  try {
    await axios.delete(`${BASE_URL}/playlists/${id}`);
    return id;
  } catch (error) {
    throw new Error("Failed to delete playlist");
  }
};

export const updatePlaylist = async (
  playlist: TypePlaylist
): Promise<TypePlaylist> => {
  try {
    const response = await axios.patch<TypePlaylist>(
      `${BASE_URL}/playlists/${playlist._id}`,
      playlist
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to update playlist");
  }
};

export const addSongToPlaylist = async (
  playlistId: string,
  songId: string
): Promise<TypePlaylist> => {
  try {
    const response = await axios.post<TypePlaylist>(
      `${BASE_URL}/playlists/${playlistId}/songs`,
      { songId }
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to add song to playlist");
  }
};

export const removeSongFromPlaylist = async (
  playlistId: string,
  songId: string
): Promise<TypePlaylist> => {
  try {
    const response = await axios.delete<TypePlaylist>(
      `${BASE_URL}/playlists/${playlistId}/songs/${songId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to remove song from playlist");
  }
};
