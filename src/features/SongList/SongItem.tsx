import React, { useState } from "react";
import { Song } from "../../redux/types";
import EditSong from "./EditSong/EditSong";
import styled from "@emotion/styled";

const StyledSongItem = styled.div`
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
  }
  p {
    font-size: 1rem;
  }
  button {
    margin-top: 10px;
  }
`;
interface Props {
  song: Song;
}

const SongItem: React.FC<Props> = ({ song }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const maxTitleLength = 20;
  const maxBodyLength = 20;
  const truncatedTitle =
    song.title.length > maxTitleLength
      ? song.title.substring(0, maxTitleLength) + "..."
      : song.title;
  const truncatedBody =
    song.body.length > maxBodyLength
      ? song.body.substring(0, maxBodyLength) + "..."
      : song.body;

  function handleEdit(songId: string | null) {
    setTimeout(() => {
      setSelectedId(songId);
    }, 1000);
  }

  return (
    <>
      <StyledSongItem>
        <h3>{truncatedTitle}</h3>
        <p>{truncatedBody}</p>
        <button onClick={() => handleEdit(song.id)}>Edit Song</button>
      </StyledSongItem>
      {selectedId && <EditSong onUpdate={handleEdit} songId={selectedId} />}
    </>
  );
};

export default SongItem;
