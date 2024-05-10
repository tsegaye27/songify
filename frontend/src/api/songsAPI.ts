import axios from "axios";
import { Song } from "../redux/types";

const BASE_URL = "http://127.0.0.1:8000";

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

export const deleteSong = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/songs/${id}`);
    console.log("Song Deleted Successfully");
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
