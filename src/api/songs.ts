import axios from "axios";
import { Song } from "../store/songs/types";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get<Song[]>(`${BASE_URL}/songs`);
    return response.data;
  } catch (error) {
    throw new Error("failed to fetch songs");
  }
};
