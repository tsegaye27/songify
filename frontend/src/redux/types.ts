export type Song = {
  _id: string;
  title: string;
  artist: string;
};

export type TypePlaylist = {
  _id: string;
  name: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
};
