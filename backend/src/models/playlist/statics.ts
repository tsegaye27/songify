import { PlaylistInterface, PlaylistModelInterface } from "./types";

export async function createPlaylist(
  this: PlaylistModelInterface,
  playlistData: Partial<PlaylistInterface>,
): Promise<PlaylistInterface> {
  return this.create(playlistData);
}

export async function findPlaylistById(
  this: PlaylistModelInterface,
  id: string,
): Promise<PlaylistInterface | null> {
  return this.findById(id).populate("owner", "email").populate("songs");
}

export async function findPublicPlaylists(
  this: PlaylistModelInterface,
): Promise<PlaylistInterface[]> {
  return this.find({ isPublic: true })
    .populate("owner", "email")
    .populate("songs")
    .sort({ updatedAt: -1 });
}

export async function findPlaylistsByOwner(
  this: PlaylistModelInterface,
  ownerId: string,
): Promise<PlaylistInterface[]> {
  return this.find({ owner: ownerId })
    .populate("songs")
    .sort({ updatedAt: -1 });
}

export async function searchPlaylists(
  this: PlaylistModelInterface,
  query: string,
): Promise<PlaylistInterface[]> {
  return this.find({
    $text: { $search: query },
  })
    .populate("owner", "email")
    .populate("songs")
    .sort({ score: { $meta: "textScore" } });
}

export async function updatePlaylist(
  this: PlaylistModelInterface,
  id: string,
  updateData: Partial<PlaylistInterface>,
): Promise<PlaylistInterface | null> {
  return this.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("songs");
}

export async function deletePlaylist(
  this: PlaylistModelInterface,
  id: string,
): Promise<PlaylistInterface | null> {
  return this.findByIdAndDelete(id);
}

export async function addSongToPlaylist(
  this: PlaylistModelInterface,
  playlistId: string,
  songId: string,
): Promise<PlaylistInterface | null> {
  return this.findByIdAndUpdate(
    playlistId,
    { $addToSet: { songs: songId } },
    { new: true, runValidators: true },
  ).populate("songs");
}

export async function removeSongFromPlaylist(
  this: PlaylistModelInterface,
  playlistId: string,
  songId: string,
): Promise<PlaylistInterface | null> {
  return this.findByIdAndUpdate(
    playlistId,
    { $pull: { songs: songId } },
    { new: true },
  ).populate("songs");
}
