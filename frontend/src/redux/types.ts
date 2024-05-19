export interface Song {
  _id: string;
  title: string;
  artist: string;
}

export interface TypePlaylist {
  name: string;
  list: Song[];
}
