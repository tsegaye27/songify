import { PlaylistInterface } from "./types";

export function isOwnedBy(this: PlaylistInterface, userId: string): boolean {
  return this.owner.toString() === userId.toString();
}
