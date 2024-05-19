import { TypePlaylist } from "../redux/types";

export const loadPlaylist = (): TypePlaylist[] => {
  const list = localStorage.getItem("playlists");
  return list ? JSON.parse(list) : [];
};

export const savePlaylist = (playlists: TypePlaylist[]): void => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
};
