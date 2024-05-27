import { SongState } from "./slices/slice";
import { FavoriteSongState } from "./slices/favoriteSlice";
import { PlaylistState } from "./slices/playlistSlice";
import { SearchState } from "./slices/searchSlice";

type RootState = {
  songs: SongState;
  favorites: FavoriteSongState;
  playlists: PlaylistState;
  search: SearchState;
};

export default RootState;
