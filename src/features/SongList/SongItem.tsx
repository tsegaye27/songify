import React from "react";
import { Song } from "../../redux/types";

interface Props {
  song: Song;
}

const SongItem: React.FC<Props> = ({ song }) => {
  const maxTitleLength = 20;
  const maxBodyLength = 100;
  const truncatedTitle =
    song.title.length > maxTitleLength
      ? song.title.substring(0, maxTitleLength) + "..."
      : song.title;
  const truncatedBody =
    song.body.length > maxBodyLength
      ? song.body.substring(0, maxBodyLength) + "..."
      : song.body;
  return (
    <div>
      <h3>{truncatedTitle}</h3>
      <p>{truncatedBody}</p>
    </div>
  );
};

export default SongItem;
