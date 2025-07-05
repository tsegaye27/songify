import { ITimeStamp } from "./shared";
import { ISong } from "./song";
import { IUser } from "./user";

export interface IPlaylist extends ITimeStamp {
  _id: string;
  name: string;
  description?: string;
  owner: IUser["_id"] | IUser;
  songs: (ISong["_id"] | ISong)[];
  isPublic: boolean;
  tags?: string[];
  songCount?: number;
}

export interface ICreatePlaylistData {
  name: string;
  description?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface IUpdatePlaylistData {
  _id: string;
  name?: string;
  description?: string;
  isPublic?: boolean;
  tags?: string[];
}
