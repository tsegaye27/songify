import { SongState } from "./slices/slice";
import { FavoriteSongState } from "./slices/favoriteSlice";
import { PlaylistState } from "./slices/playlistSlice";

interface RootState {
  songs: SongState;
  favorites: FavoriteSongState;
  playlist: PlaylistState;
}

export default RootState;
