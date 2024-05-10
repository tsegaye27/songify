import axios from "axios";
import { Song } from "../redux/types";
import { url } from "./config.ts";
const BASE_URL = url;

export const fetchSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get<Song[]>(`${BASE_URL}/songs`);
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch songs");
  }
};

export const addSong = async (song: Song): Promise<Song> => {
  try {
    const response = await axios.post<Song>(`${BASE_URL}/songs`, song);
    return response.data;
  } catch (error) {
    throw new Error("failed to create song");
  }
};

export const deleteSong = async (id: string): Promise<string> => {
  try {
    await axios.delete(`${BASE_URL}/songs/${id}`);
    return id;
  } catch (error) {
    throw new Error("Failed to delete song");
  }
};

export const updateSong = async (song: Song): Promise<Song> => {
  try {
    const response = await axios.patch<Song>(
      `${BASE_URL}/songs/${song._id}`,
      song
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to update song");
  }
};
