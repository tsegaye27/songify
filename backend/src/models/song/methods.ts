import { SongInterface } from "./types";

export function getDisplayInfo(this: SongInterface): string {
  return `${this.title} by ${this.artist}`;
}
