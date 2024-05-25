export interface Song {
  _id: string;
  title: string;
  artist: string;
}

export interface TypePlaylist {
  _id: string;
  name: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}
