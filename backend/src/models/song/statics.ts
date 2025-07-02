import { Model } from "mongoose";
import { SongInterface } from "./types";

export async function createSong(
  this: Model<SongInterface>,
  songData: Partial<SongInterface>,
): Promise<SongInterface> {
  return this.create(songData);
}

export async function findSongById(
  this: Model<SongInterface>,
  id: string,
): Promise<SongInterface | null> {
  return this.findById(id).exec();
}

export async function findSongsByArtist(
  this: Model<SongInterface>,
  artist: string,
): Promise<SongInterface[]> {
  return this.find({
    artist: { $regex: artist, $options: "i" },
  }).sort({
    title: 1,
  });
}

export async function findSongsByTitle(
  this: Model<SongInterface>,
  title: string,
): Promise<SongInterface[]> {
  return this.find({
    title: { $regex: title, $options: "i" },
  }).sort({
    title: 1,
  });
}

export async function searchSongs(
  this: Model<SongInterface>,
  query: string,
): Promise<SongInterface[]> {
  return this.find({
    $text: { $search: query },
  }).sort({
    score: { $meta: "textScore" },
  });
}

export async function updateSong(
  this: Model<SongInterface>,
  id: string,
  updateData: Partial<SongInterface>,
): Promise<SongInterface | null> {
  return this.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
}

export async function deleteSong(
  this: Model<SongInterface>,
  id: string,
): Promise<SongInterface | null> {
  return this.findByIdAndDelete(id);
}
