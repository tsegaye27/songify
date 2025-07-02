import { Document, Model } from "mongoose";

export interface SongInterface extends Document {
  _id: string;
  title: string;
  artist: string;
  duration?: number;
  genre?: string;
  album?: string;
  year?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SongModelInterface extends Model<SongInterface> {
  createSong(songData: Partial<SongInterface>): Promise<SongInterface>;
  findSongById(id: string): Promise<SongInterface | null>;
  findSongsByArtist(artist: string): Promise<SongInterface[]>;
  findSongsByTitle(title: string): Promise<SongInterface[]>;
  searchSongs(query: string): Promise<SongInterface[]>;
  updateSong(
    id: string,
    updateData: Partial<SongInterface>,
  ): Promise<SongInterface | null>;
  deleteSong(id: string): Promise<SongInterface | null>;
}
