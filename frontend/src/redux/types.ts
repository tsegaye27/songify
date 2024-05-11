export interface Song {
  _id: string;
  title: string;
  artist: string;
}

export interface SongsList {
  list: Song[];
  name: string;
}
