import { SongInterface } from "./types";

export function getDisplayDuration(this: SongInterface): string {
  if (!this.duration) return "Unknown";

  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function getDisplayInfo(this: SongInterface): string {
  return `${this.title} by ${this.artist}`;
}
