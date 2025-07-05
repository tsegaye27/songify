import { ITimeStamp } from "./shared";

export interface ISong extends ITimeStamp {
  _id: string;
  title: string;
  artist: string;
  album?: string;
  genre?: string;
}

export interface ICreateSongData {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
}

export interface IUpdateSongData {
  _id: string;
  title?: string;
  artist?: string;
  album?: string;
  genre?: string;
}
