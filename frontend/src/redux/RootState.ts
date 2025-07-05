import { SongState } from "./slices/songSlice";
import { PlaylistState } from "./slices/playlistSlice";
import { AuthState } from "./slices/authSlice";
import { StatisticsState } from "./slices/statisticsSlice";
import { FavoritesState } from "./slices/favoritesSlice";

interface RootState {
  songs: SongState;
  playlists: PlaylistState;
  auth: AuthState;
  statistics: StatisticsState;
  favorites: FavoritesState;
}

export default RootState;
