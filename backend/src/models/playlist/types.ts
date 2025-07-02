import { Document, Model } from "mongoose";
import { SongInterface } from "../song/types";
import { UserInterface } from "../user/types";

export interface PlaylistInterface extends Document {
  _id: string;
  name: string;
  description?: string;
  owner: UserInterface["_id"] | UserInterface;
  songs: (SongInterface["_id"] | SongInterface)[];
  isPublic: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  getTotalDuration(): number;
}

export interface PlaylistModelInterface extends Model<PlaylistInterface> {
  createPlaylist(
    playlistData: Partial<PlaylistInterface>,
  ): Promise<PlaylistInterface>;
  findPlaylistById(id: string): Promise<PlaylistInterface | null>;
  findPlaylistsByOwner(ownerId: string): Promise<PlaylistInterface[]>;
  findPublicPlaylists(): Promise<PlaylistInterface[]>;
  searchPlaylists(query: string): Promise<PlaylistInterface[]>;
  updatePlaylist(
    id: string,
    updateData: Partial<PlaylistInterface>,
  ): Promise<PlaylistInterface | null>;
  deletePlaylist(id: string): Promise<PlaylistInterface | null>;
  addSongToPlaylist(
    playlistId: string,
    songId: string,
  ): Promise<PlaylistInterface | null>;
  removeSongFromPlaylist(
    playlistId: string,
    songId: string,
  ): Promise<PlaylistInterface | null>;
}
