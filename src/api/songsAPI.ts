import axios from "axios";
import { Song } from "../redux/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get<Song[]>(`${BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch songs");
  }
};

export const addSong = async (song: Song): Promise<Song> => {
  try {
    const response = await axios.post<Song>(`${BASE_URL}/posts`, song);
    return response.data;
  } catch (error) {
    throw new Error("failed to create song");
  }
};

export const deleteSong = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/posts/${id}`);
  } catch (error) {
    throw new Error("failed to delete song");
  }
};

export const updateSong = async (song: Song): Promise<Song> => {
  try {
    const response = await axios.put<Song>(
      `${BASE_URL}/posts/${song.id}`,
      song
    );
    return response.data;
  } catch (error) {
    throw new Error("failed to update song");
  }
};
