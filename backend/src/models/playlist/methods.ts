import { PlaylistInterface } from "./types";

export function getTotalDuration(this: PlaylistInterface): number {
  if (!this.populated("songs")) return 0;

  return (this.songs as any[]).reduce((total, song) => {
    return total + (song.duration || 0);
  }, 0);
}

export function getFormattedDuration(this: PlaylistInterface): string {
  const totalSeconds = this.getTotalDuration();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function isOwnedBy(this: PlaylistInterface, userId: string): boolean {
  return this.owner.toString() === userId.toString();
}
